# Interfaces-TypeScript

**Autor:** Matheus Pereira  

---

## Visão geral

Este projeto contém três exemplos simples em TypeScript que ilustram o uso de **interfaces**.  

Arquivos principais:

- `exemplo01.ts`
- `exemplo02.ts`
- `exemplo03.ts`

Cada um demonstra conceitos de interfaces como propriedades obrigatórias, opcionais, métodos e herança.

---

## Estrutura do projeto

```
interfaces-typescript/
├── exemplo01.ts
├── exemplo02.ts
├── exemplo03.ts
├── tsconfig.json
└── (arquivos .js gerados após a compilação)
```

---

## Requisitos

- Node.js (>= 18 recomendado)  
- TypeScript instalado (global ou local)  

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/mafhper/interfaces-typescript.git
cd interfaces-typescript
```

Instale o TypeScript (se ainda não tiver):

```bash
npm install -g typescript
```

ou de forma local:

```bash
npm install typescript --save-dev
```

---

## Compilação

Para compilar os arquivos `.ts`:

```bash
tsc
```

ou, se o TypeScript estiver instalado apenas localmente:

```bash
npx tsc
```

Isso vai gerar os arquivos `.js` correspondentes.

---

## Execução

Depois de compilados, execute cada exemplo com:

```bash
node exemplo01.js
node exemplo02.js
node exemplo03.js
```

---

## Explicação do `tsconfig.json`

O projeto usa uma versão **simplificada** do `tsconfig.json`, criada a partir do comando `tsc --init` e reduzida para os pontos essenciais.  

Exemplo típico (adaptado para este projeto):

```json
{
  "compilerOptions": {
    "target": "es2016",        
    "module": "commonjs",      
    "strict": true,            
    "esModuleInterop": true,   
    "forceConsistentCasingInFileNames": true, 
    "skipLibCheck": true       
  }
}
```

### O que cada opção faz:
- **target:** define para qual versão do JavaScript o código será convertido (ES2016 é suficiente para Node moderno).  
- **module:** indica qual sistema de módulos usar. Como estamos rodando no Node.js, `commonjs` é o mais simples.  
- **strict:** liga várias verificações de tipo, ajudando a escrever código mais seguro.  
- **esModuleInterop:** facilita o uso de `import` com pacotes que usam `require`.  
- **forceConsistentCasingInFileNames:** garante que os nomes de arquivos usados nos imports tenham sempre a mesma grafia (importante em sistemas Linux, sensíveis a maiúsculas/minúsculas).  
- **skipLibCheck:** acelera a compilação ignorando checagem em arquivos de definição de bibliotecas externas.  

---

## O que aprender com os exemplos

- Definir e usar interfaces para objetos  
- Propriedades opcionais (`?`) e obrigatórias  
- Interfaces com métodos  
- Extensão de interfaces (`extends`)  
- Contratos de tipos para funções e classes  

---

## Licença

Este projeto está sob a licença MIT.  
