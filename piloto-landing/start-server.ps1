# Script para iniciar um servidor HTTP simples usando PowerShell
$Hso = New-Object Net.HttpListener
$Hso.Prefixes.Add("http://localhost:8080/")
$Hso.Start()

Write-Host "Servidor iniciado em http://localhost:8080/"
Write-Host "Pressione Ctrl+C para parar o servidor"

$path = $pwd.Path

while ($Hso.IsListening) {
    $HC = $Hso.GetContext()
    $HRes = $HC.Response
    $HRes.Headers.Add("Content-Type","text/html")
    $Buf = [Text.Encoding]::UTF8.GetBytes("")
    $HRes.ContentLength64 = $Buf.Length
    $HRes.OutputStream.Write($Buf,0,$Buf.Length)
    
    $requestedFile = $HC.Request.RawUrl
    if ($requestedFile -eq "/") { $requestedFile = "/index.html" }
    $requestedFile = $requestedFile.Replace("/","\")
    
    $filePath = Join-Path $path $requestedFile.Substring(1)
    
    if (Test-Path $filePath) {
        $contentType = "text/html"
        if ($filePath -match "\.css$") { $contentType = "text/css" }
        if ($filePath -match "\.js$") { $contentType = "application/javascript" }
        if ($filePath -match "\.png$") { $contentType = "image/png" }
        if ($filePath -match "\.jpg$") { $contentType = "image/jpeg" }
        if ($filePath -match "\.jpeg$") { $contentType = "image/jpeg" }
        
        $HRes.Headers.Add("Content-Type", $contentType)
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $HRes.ContentLength64 = $content.Length
        $HRes.OutputStream.Write($content, 0, $content.Length)
    } else {
        $HRes.StatusCode = 404
    }
    
    $HRes.Close()
}

$Hso.Stop()
