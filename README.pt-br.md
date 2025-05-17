# Bem-vindo à Landing Page da VFS Castanhas

[![en](https://img.shields.io/badge/lang-en-blue.svg)](https://github.com/andresinho20049/vfs-castanhas-landing-page/blob/amplify/README.md)

## Introdução

Bem-vindo ao projeto da Landing Page da VFS Castanhas! Este projeto é uma aplicação web moderna e responsiva, desenvolvida para apresentar e gerenciar a marca VFS Castanhas. Ela foi desenvolvida utilizando tecnologias de ponta, como Vite, TypeScript, React, shadcn-ui e Tailwind CSS.

Este repositório inclui ferramentas e recursos pré-configurados para agilizar o desenvolvimento e a implantação, como:

- **Integração com AWS Amplify**: Para hospedagem, autenticação e serviços de back-end.
- **Sistema de Autenticação**: Configurado utilizando AWS Amplify e React Context API para gerenciar sessões de usuários e proteger rotas.
- **Roteamento**: Implementado com React Router para navegação fluida.
- **IU Personalizável**: Construída com Tailwind CSS e shadcn-ui para um sistema de design consistente e flexível.

## Informações do projeto

Este projeto foi inicializado com o Lovable

### Como posso editar este código?

Existem várias maneiras de editar sua aplicação.

**Use o Lovable**

Basta visitar o [Projeto Lovable](https://lovable.dev/projects/55c6f32e-e6b8-4921-8bf7-9c78c8bc1550) e iniciar o prompt.

As alterações feitas com o Lovable serão enviadas automaticamente para este repositório.

**Use sua IDE preferida**

Se quiser trabalhar localmente usando sua própria IDE, você pode clonar este repositório e enviar as alterações. As alterações enviadas também serão refletidas no Lovable.

O único requisito é ter o Node.js e o npm instalados - [instalar com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Siga estes passos:

```sh
# Passo 1: Clone o repositório usando a URL do Git do projeto.
git clone https://github.com/andresinho20049/vfs-castanhas-landing-page.git

# Passo 2: Navegue até o diretório do projeto.
cd vfs-castanhas-landing-page

# Passo 3: Instale as dependências necessárias.
npm i

# Passo 4: Inicie o servidor de desenvolvimento com recarregamento automático e visualização instantânea.
npm run dev
```

Ao enviar seus commits, o projeto será atualizado automaticamente na plataforma Lovable.

## Segunda Fase do Projeto

Nesta segunda fase do projeto, deixamos de usar a biblioteca Lovable para desenvolver e gerenciar nossa aplicação. Em vez disso, optamos por usar o AWS Amplify como nossa estrutura para construir e implantar aplicativos sem servidor.

Como parte dessa mudança, removemos a biblioteca Lovable do nosso projeto e a substituímos por um novo conjunto de dependências exigidas pelo Amplify. Essas dependências incluem:

- Executar `npx amplify init` para inicializar nosso projeto Amplify
- Instalar as bibliotecas e plugins necessários do AWS Amplify, incluindo:

* `aws-amplify` é o núcleo para configuração com o Amplify
* `@aws-amplify/auth` para autenticação e autorização
* `@aws-amplify/ui-react` para estilização e componentes React

Essas mudanças nos permitiram aproveitar o poder do AWS Amplify para implantar nosso aplicativo na nuvem, utilizando o Cognito para autenticação de usuários e outros serviços da AWS, conforme necessário.

### Pré-requisitos para usar este projeto com o Amplify

Antes de começar a usar este projeto com o Amplify, certifique-se de ter os seguintes pré-requisitos instalados:

- Node.js (versão 14 ou posterior)
- npm (versão 6 ou posterior)
- AWS CLI ([Mais detalhes](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/cli-chap-getting-started.html))
- AWS Amplify CLI (instale com `npm install -g @aws-amplify/cli`)

### Configurando seu projeto com o Amplify

Para configurar seu projeto com o Amplify, siga estas etapas:

1. Clone o repositório usando a URL do Git do projeto.
2. Navegue até o diretório do projeto.
3. Execute `npx amplify init` para inicializar seu projeto Amplify.
4. Instale as dependências necessárias executando \
   `npm i aws-amplify @aws-amplify/auth @aws-amplify/ui-react`
5. Configure as configurações e credenciais do AWS Amplify conforme solicitado.

## Quais tecnologias são usadas neste projeto?

Este projeto foi criado com:

- **Vite**: Uma ferramenta de construção rápida para aplicações web modernas.
- **TypeScript**: Para desenvolvimento em JavaScript com tipagem segura.
- **React**: Uma biblioteca popular para construção de interfaces de usuário.
- **shadcn-ui**: Uma biblioteca de componentes para construção de componentes de UI acessíveis e personalizáveis.
- **Tailwind CSS**: Um framework CSS com foco em utilitários para desenvolvimento rápido de UI.
- **AWS Amplify**: Para serviços de hospedagem, autenticação e backend.

## Como este projeto está configurado?

Este projeto vem pré-configurado com os seguintes recursos:

1. **Hospedagem AWS Amplify**: O projeto está configurado para ser implantado no AWS Amplify, com configurações de build e pipelines de implantação já definidos.
2. **Autenticação**: A autenticação do usuário é implementada usando o serviço de autenticação do AWS Amplify. O arquivo `AuthContext.tsx` gerencia as sessões do usuário e fornece um contexto global para autenticação.
3. **Rotas Protegidas**: As rotas são protegidas usando uma combinação do React Router e do contexto de autenticação. Usuários não autorizados são redirecionados para a página inicial.
4. **IU Personalizável**: A IU é construída com Tailwind CSS e shadcn-ui, permitindo fácil personalização e design consistente.
5. **Ferramentas de Desenvolvimento**: O projeto é configurado com Vite para builds rápidos e substituição de módulos a quente.

## Implantando com o AWS Amplify

Você também pode implantar este projeto usando o AWS Amplify. Siga estas etapas:

1. Faça login no [Console do AWS Amplify](https://aws.amazon.com/amplify/).
2. Clique em **Começar** em "Implantar".
3. Conecte seu repositório do GitHub e selecione a ramificação que deseja implantar.
4. Defina as configurações de compilação. Use o seguinte exemplo para o arquivo `amplify.yml`:

   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - "**/*"
     cache:
       paths:
         - node_modules/**/*
   ```

5. Salve e implante seu aplicativo.
6. Após a implantação, você pode acessar seu aplicativo por meio da URL fornecida pelo Amplify ou conectar-se a um domínio personalizado.

## Configurando a Autenticação do AWS Amplify

Este projeto é configurado com o AWS Amplify para autenticação, usando a biblioteca `@aws-amplify/auth` para gerenciar sessões e funções de usuário. Abaixo, uma explicação detalhada de como a autenticação é implementada e como as rotas são gerenciadas.

### Visão Geral da Autenticação

O sistema de autenticação é criado usando o contexto `AuthContext.tsx`, que utiliza o método `fetchAuthSession` do AWS Amplify para recuperar a sessão e as funções do usuário atual. O contexto fornece acesso global ao estado de autenticação do usuário (`isAuthenticated`) e às informações detalhadas do usuário (`userInfo`), como ID, e-mail, foto do perfil e funções.

### Estrutura do Aplicativo

1. **`AuthContext.tsx`**:

- Este arquivo inicializa o contexto de autenticação e fornece métodos para buscar a sessão e as funções do usuário.
- Utiliza `fetchAuthSession` para recuperar o payload do token de ID do usuário, que inclui atributos como `email`, `picture` e `cognito:groups` (funções).
- O contexto expõe `userInfo` (detalhes do usuário) e `isAuthenticated` (booleano que indica se o usuário está logado).

2. **`App.tsx`**:

- O ponto de entrada da aplicação.
- Envolve toda a aplicação com o `AuthProvider` para garantir que o contexto de autenticação esteja disponível globalmente.
- Renderiza o componente `Routes.tsx` para gerenciar a navegação.

3. **`Routes.tsx`**:

- Define a estrutura de roteamento da aplicação.
- Inclui três tipos de rotas:
- **Rotas Públicas**: Acessíveis a todos os usuários, como a LandingPage.
- **Rotas Privadas**: Restritas a usuários autenticados.

- **Rotas Baseadas em Funções**: Restritas a usuários com funções específicas (ex.: `admin`, `manager`).

> Se o usuário tentar acessar uma rota não autorizada, essa rota não existirá para ele e ele receberá um erro 404.

### Fluxo de Exemplo

1. Quando um usuário visita o aplicativo, o `AuthContext` busca sua sessão e determina se ele está autenticado.
2. Se o usuário navegar para uma rota privada (ex.: `/perfil`), o componente `ProtectedRoute` verifica seu status de autenticação:

- Se autenticado, o usuário recebe acesso.
- Se não autenticado, o usuário receberá um erro 404.

3. Se o usuário navegar para uma rota baseada em funções (ex.: `/console`), o componente `ProtectedRoute` verifica suas funções:

- Se o usuário tiver a função necessária, o acesso é concedido. - Caso contrário, o usuário receberá um erro 404.

## Acessando Rotas com Funções Baseadas (Autorização)

Para acessar rotas protegidas por funções baseadas, o proprietário deve incluir sua conta de usuário em grupos específicos no AWS Cognito. Esta é uma etapa necessária para garantir que os usuários estejam devidamente autorizados e autenticados.

### Atribuir Usuários a Grupos

Para atribuir usuários a grupos, siga estas etapas:

1. Navegue até o painel do AWS Cognito.
2. Selecione seu pool de usuários na lista de pools disponíveis.
3. Na seção `Gerenciamento de Usuários`, clique em `Grupos`.
4. Encontre o grupo necessário para as permissões que deseja atribuir e selecione.
5. Em seguida, clique em `Adicionar usuário ao grupo`, encontre o usuário ao qual deseja atribuir a permissão.
6. Marque-o e clique em Adicionar.

**Observação:** Certifique-se de testar seu aplicativo cuidadosamente após fazer essas alterações para garantir que os usuários estejam devidamente autorizados e autenticados.

Seguindo estas etapas, você pode garantir que seu aplicativo esteja devidamente protegido com funções baseadas e que apenas usuários autorizados tenham acesso a rotas protegidas.

## Benefícios de usar o AWS Amplify

O AWS Amplify oferece um conjunto abrangente de ferramentas e serviços para ajudar você a criar, implantar e gerenciar seu aplicativo. Com o Amplify, você pode aproveitar os seguintes benefícios:

- **Gerenciamento de Projetos**: \
  O Amplify permite que você gerencie seu projeto facilmente a partir de um único painel, incluindo gerenciamento de código, implantação, monitoramento e análises.

- **Integração com Serviços da AWS**: \
  O Amplify se integra perfeitamente a outros serviços da AWS, como o Cognito para autenticação, o API Gateway para gerenciamento de APIs e o S3 para armazenamento de arquivos estáticos.

- **Configuração de Pipeline**: \
  O Amplify oferece uma maneira simples e intuitiva de configurar seu pipeline, incluindo compilações, testes e implantações automatizados.

- **Implantações Automatizadas**: \
  Com o Amplify, você pode automatizar facilmente implantações em diferentes ambientes com apenas alguns cliques.

### Qual é a Alternativa?

Vamos dar uma olhada no que seria necessário para implantar um site estático no S3 sem usar o AWS Amplify. Aqui estão as etapas envolvidas:

1. **Configurar o CodeCommit para Controle de Origem**

- Crie um novo repositório no CodeCommit e envie seu código para lá.
- Configure sua máquina local para usar o CodeCommit como seu repositório de controle de origem.

2. **Configurar o S3 para Hospedagem de Sites Estáticos**

- Crie um novo bucket no S3 e configure-o como um host de site estático.
- Carregue os arquivos do seu site para o bucket usando a CLI da AWS ou o console do S3.

3. **Configurar o API Gateway para Gerenciamento de APIs (Opcional)**

- Se você tiver uma API, crie uma nova API REST no API Gateway e configure-a para integração com seu bucket do S3.
- Configure chaves de API e planos de uso conforme necessário.

4. **Configurar o CloudWatch para Monitoramento**

- Crie um novo painel no CloudWatch para monitorar as métricas de desempenho do seu aplicativo.
- Configure alarmes e notificações conforme necessário.

5. **Configurar o CodePipeline para Implantações Automatizadas**

- Crie um novo pipeline no CodePipeline e configure-o para integração com o CodeCommit, S3 e API Gateway (se aplicável).
- Configure builds, testes e implantações automatizadas usando o Jenkins ou outra ferramenta de CI/CD.

> Como você pode ver, implantar um site estático no S3 sem usar o AWS Amplify exige bastante tempo e esforço. Com o Amplify, você pode aproveitar os benefícios do gerenciamento de projetos, integração com serviços da AWS, configuração de pipeline e implantações automatizadas com apenas alguns cliques!

## :copyright: Copyright

**Desenvolvido por** [Andresinho20049](https://andresinho20049.com.br/) \
**Projeto**: LandingPage VFS Castanhas \
**Descrição**: \
Este projeto foi inicialmente construído usando o Lovable e posteriormente migrado para o AWS Amplify para implantação. O site apresenta uma landing page com autenticação habilitada através do AWS Cognito. [Visite o site no link para mais informações](https://amplify.d2crsg2ixs07i2.amplifyapp.com/) sobre o tópico e o assunto.
