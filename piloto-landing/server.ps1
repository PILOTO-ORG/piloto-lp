# Script simples para iniciar um servidor HTTP
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8000/")
$listener.Start()

Write-Host "Servidor iniciado em http://localhost:8000/"
Write-Host "Pressione Ctrl+C para parar o servidor"

$path = $pwd.Path

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/") { $localPath = "/index.html" }
        
        $filename = Join-Path $path $localPath.Substring(1)
        
        if (Test-Path $filename) {
            $contentType = "text/html"
            if ($filename -match "\.css$") { $contentType = "text/css" }
            if ($filename -match "\.js$") { $contentType = "application/javascript" }
            if ($filename -match "\.png$") { $contentType = "image/png" }
            if ($filename -match "\.jpg$") { $contentType = "image/jpeg" }
            if ($filename -match "\.jpeg$") { $contentType = "image/jpeg" }
            
            $response.ContentType = $contentType
            $content = [System.IO.File]::ReadAllBytes($filename)
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
        }
        
        $response.Close()
    } catch {
        Write-Host "Erro: $_"
    }
}

$listener.Stop()
