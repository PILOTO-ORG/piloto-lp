import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CLIENTES } from '../data/clientes';

// Os dados dos clientes (logo, texto, métricas, link) moram em
// src/data/clientes.ts porque o herói também os usa, na faixa "Em operação em".
// Duas cópias da mesma lista divergiriam na primeira troca de logo.

const Cases = () => {
  return (
    <section className="py-20 bg-gray-50" id="clientes">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Quem já roda na Piloto
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Três operações diferentes no mesmo app: um restaurante, uma locadora
            de materiais para festas e uma operadora de ecoturismo. Pode abrir os
            três e conferir.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-3">
          {CLIENTES.map((caso, i) => {
            return (
              <motion.article
                key={caso.nome}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="flex flex-col bg-white rounded-2xl border border-gray-200 p-7 hover:shadow-md transition-shadow"
              >
                {/*
                  Caixa da logo com ALTURA fixa e largura livre: as três marcas
                  têm proporções muito diferentes (1,18:1 · 1:1 · 3,4:1) e
                  qualquer largura fixa esmagaria o wordmark da Itaway. A caixa
                  tem altura própria para os três cartões alinharem o texto
                  abaixo dela, independente do formato da logo.
                */}
                <div className="h-14 flex items-center mb-4">
                  <img
                    src={caso.logo}
                    alt={caso.logoAlt}
                    className="max-h-12 w-auto max-w-[150px] object-contain object-left"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <h3 className="font-bold text-gray-900 leading-tight">
                  {caso.nome}
                </h3>
                <p className="text-sm text-gray-500 mb-5">{caso.ramo}</p>

                <h4 className="text-lg font-semibold text-blue-700 mb-3 leading-snug">
                  {caso.titulo}
                </h4>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  {caso.descricao}
                </p>

                <dl className="grid grid-cols-3 gap-3 mb-6 py-4 border-y border-gray-100">
                  {caso.metricas.map((m) => (
                    <div key={m.rotulo}>
                      <dt className="sr-only">{m.rotulo}</dt>
                      <dd>
                        <span className="block text-xl font-bold text-gray-900 leading-tight tabular-nums">
                          {m.valor}
                        </span>
                        <span className="block text-xs text-gray-500 leading-snug mt-0.5">
                          {m.rotulo}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>

                <ul className="space-y-2 mb-6 flex-grow">
                  {caso.entregas.map((entrega) => (
                    <li key={entrega} className="flex items-start text-sm">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2.5 mt-1.5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-gray-700">{entrega}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={caso.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 transition-colors mt-auto"
                >
                  {caso.urlLabel}
                  <ArrowUpRight className="ml-1 w-4 h-4" aria-hidden="true" />
                </a>
              </motion.article>
            );
          })}
        </div>

        {/*
          Data da medição junto do número. Sem ela, "18.614 reservas" vira uma
          afirmação no presente que envelhece sozinha e ninguém sabe desde
          quando está errada.
        */}
        <p className="max-w-6xl mx-auto mt-8 text-sm text-gray-500 text-center">
          Números medidos nos sistemas em setembro e outubro de 2026, publicados
          com autorização de cada cliente.
        </p>
      </div>
    </section>
  );
};

export default Cases;
