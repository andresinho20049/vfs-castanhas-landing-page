# Welcome to the VFS Castanhas Landing Page

[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/andresinho20049/vfs-castanhas-landing-page/blob/amplify/README.pt-br.md)

## Introduction

Welcome to the VFS Castanhas Landing Page project! This project is a modern, responsive web application built to showcase and manage the VFS Castanhas brand. It is designed using cutting-edge technologies such as Vite, TypeScript, React, shadcn-ui, and Tailwind CSS.

This repository includes pre-configured tools and features to streamline development and deployment, such as:

- **AWS Amplify Integration**: For hosting, authentication, and backend services.
- **Authentication System**: Configured using AWS Amplify and React Context API to manage user sessions and protect routes.
- **Routing**: Implemented with React Router for seamless navigation.
- **Customizable UI**: Built with Tailwind CSS and shadcn-ui for a consistent and flexible design system.

## Application Architecture

This web project was developed using **AWS Amplify**, providing a robust and scalable architecture, with a focus on the integration of serverless services to optimize costs and performance. **React** was the choice for the front-end, ensuring a dynamic and responsive user experience.

![Diagrama](/public/diagram/ArquitectureDiagram.drawio.png)

### Frontend and Authentication

The user interface is built in **React**, with a **Landing Page** in the root route (`/`). To ensure security and access management, user authentication is performed through **AWS Cognito**, configured with the `amplify add auth` command. This allows only logged-in users to access the `/profile` route and users with the `admin` role to have exclusive access to the `/console` route.

### Backend and APIs

The backend backbone is composed of **AWS Lambda Functions**, accessible through a single **API Gateway** configured with REST architecture. Each backend functionality is mapped to a specific route in the API Gateway, which directs requests to the corresponding Lambda Function.

- **Product Registration (`/products`):** The product registration functionality on the console screen uses an **AWS Lambda Function (`vfscastanhaslandingpa60a863b`)** for CRUD (Create, Read, Update, Delete) operations on a **DynamoDB table (`dynamo01vfscastanhas`)**. Product images are stored in **AWS S3 (`vfscastanhass301`)**, and their URLs are saved in DynamoDB.

- **AI Integration (`/ai`):** An **AWS Lambda Function (`vfscastanhasaimodel01`)** manages the integration with **Amazon Bedrock**, AWS's generative AI service. This function allows user interaction with the chatbot.

- **Chatbot (`/chat`):** Conversations between the user and the chatbot are persisted in a dedicated **DynamoDB table (`dynamo01vfscastanhaschatbot`)**, allowing the history of interactions, the **AWS Lambda Function (`vfscastanhaschatbot`)** retrieves the conversation history after the user enters the portal.

## Project info

This project was bootstrapped with Lovable

### How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/55c6f32e-e6b8-4921-8bf7-9c78c8bc1550) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/andresinho20049/vfs-castanhas-landing-page.git

# Step 2: Navigate to the project directory.
cd vfs-castanhas-landing-page

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

When you push your commits, the project will automatically update on the Lovable platform.

## Second Phase of the Project

In this second phase of the project, we moved away from using the Lovable library to develop and manage our application. Instead, we chose to use AWS Amplify as our framework for building and deploying serverless applications.

As part of this change, we removed the Lovable library from our project and replaced it with a new set of dependencies required by Amplify. These dependencies include:

- Running `npx amplify init` to initialize our Amplify project
- Installing the required AWS Amplify libraries and plugins, including:

* `aws-amplify` is the core for configuring with Amplify
* `@aws-amplify/auth` for authentication and authorization
* `@aws-amplify/ui-react` for styling and React components

These changes allowed us to leverage the power of AWS Amplify to deploy our application in the cloud, leveraging Cognito for user authentication and other AWS services as needed.

### Prerequisites for using this project with Amplify

Before you start using this project with Amplify, make sure you have the following prerequisites installed:

- Node.js (version 14 or later)
- npm (version 6 or later)
- AWS CLI ([More Details](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html))
- AWS Amplify CLI (install with `npm install -g @aws-amplify/cli`)

### Setting up your project with Amplify

To set up your project with Amplify, follow these steps:

1. Clone the repository using the project's Git URL.
2. Navigate to the project directory.
3. Run `npx amplify init` to initialize your Amplify project.
4. Install the required dependencies by running \
   `npm i aws-amplify @aws-amplify/auth @aws-amplify/ui-react`
5. Configure AWS Amplify settings and credentials as prompted.

## What technologies are used for this project?

This project is built with:

- **Vite**: A fast build tool for modern web applications.
- **TypeScript**: For type-safe JavaScript development.
- **React**: A popular library for building user interfaces.
- **shadcn-ui**: A component library for building accessible and customizable UI components.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **AWS Amplify**: For hosting, authentication, and backend services.

## How is this project configured?

This project comes pre-configured with the following features:

1. **AWS Amplify Hosting**: The project is set up to be deployed on AWS Amplify, with build settings and deployment pipelines already defined.
2. **Authentication**: User authentication is implemented using AWS Amplify's authentication service. The `AuthContext.tsx` file manages user sessions and provides a global context for authentication.
3. **Protected Routes**: Routes are protected using a combination of React Router and the authentication context. Unauthorized users are redirected to the landing page.
4. **Customizable UI**: The UI is built with Tailwind CSS and shadcn-ui, allowing for easy customization and consistent design.
5. **Development Tools**: The project is configured with Vite for fast builds and hot module replacement during development.

## Deploying with AWS Amplify

You can also deploy this project using AWS Amplify. Follow these steps:

1. Log in to the [AWS Amplify Console](https://aws.amazon.com/amplify/).
2. Click on **Get Started** under "Deploy".
3. Connect your GitHub repository and select the branch you want to deploy.
4. Configure the build settings. Use the following example for the `amplify.yml` file:

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

5. Save and deploy your application.
6. Once deployed, you can access your application via the Amplify-provided URL or connect a custom domain.

## Setting up AWS Amplify Authentication

This project is configured with AWS Amplify for authentication, using the `@aws-amplify/auth` library to manage user sessions and roles. Below is a detailed explanation of how authentication is implemented and how routes are managed.

### Authentication Overview

The authentication system is built using the `AuthContext.tsx` context, which leverages AWS Amplify's `fetchAuthSession` method to retrieve the current user's session and roles. The context provides global access to the user's authentication state (`isAuthenticated`) and detailed user information (`userInfo`), such as their ID, email, profile picture, and roles.

### Application Structure

1. **`AuthContext.tsx`**:

   - This file initializes the authentication context and provides methods to fetch the user's session and roles.
   - It uses `fetchAuthSession` to retrieve the user's ID token payload, which includes attributes like `email`, `picture`, and `cognito:groups` (roles).
   - The context exposes `userInfo` (user details) and `isAuthenticated` (boolean indicating if the user is logged in).

2. **`App.tsx`**:

   - The entry point of the application.
   - Wraps the entire application with the `AuthProvider` to ensure the authentication context is available globally.
   - Renders the `Routes.tsx` component to manage navigation.

3. **`Routes.tsx`**:
   - Defines the application's routing structure.
   - Includes three types of routes:
     - **Public Routes**: Accessible to all users, such as the landing page.
     - **Private Routes**: Restricted to authenticated users.
     - **Role-Based Routes**: Restricted to users with specific roles (e.g., `admin`, `manager`).

> If the user tries to access an unauthorized route, that route will not exist for him and he will receive a 404.

### Example Flow

1. When a user visits the application, the `AuthContext` fetches their session and determines if they are authenticated.
2. If the user navigates to a private route (e.g., `/perfil`), the `ProtectedRoute` component checks their authentication status:
   - If authenticated, the user is granted access.
   - If not authenticated, the user will receive a 404
3. If the user navigates to a role-based route (e.g., `/console`), the `ProtectedRoute` component checks their roles:
   - If the user has the required role, they are granted access.
   - If not, the user will receive a 404.

## Accessing Routes with Based-Roles (Authorization)

To access routes protected by based-roles, the owner must include their user account in specific groups within AWS Cognito. This is a required step to ensure that users are properly authorized and authenticated.

### Assign Users to Groups

To assign users to groups, follow these steps:

1. Navigate to the AWS Cognito dashboard.
2. Select your user pool from the list of available pools.
3. In the `User management` section, click on `Groups`.
4. Find the required group for the permissions you want to assign, and select.
5. Then click on `Add user to group`, find the user you want to assign the permission to.
6. Mark it and click add.

**Note:** Make sure to test your application thoroughly after making these changes to ensure that users are properly authorized and authenticated.

By following these steps, you can ensure that your application is properly secured with based-roles and that only authorized users have access to protected routes.

## Integration with API Gateway, Lambda and DynamoDB

We utilized the `amplify add api` command to create an API and a corresponding Lambda function that performs CRUD operations on a DynamoDB table for data persistence.

### Key Highlights

- Utilized AWS Amplify's built-in support for API creation and Lambda functions.
- Integrated with DynamoDB for efficient data storage and retrieval.
- Simplified the process of creating and managing APIs and Lambda functions through Amplify.

### Data Model

```typescript
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
};
```

This is the data model used for storing product information in DynamoDB. The `imageUrl` field is optional, allowing for products without images to be stored efficiently.

## Integration with S3

We utilized the `amplify add storage` command to create an S3 bucket and upload product images. The image URL is then stored in the DynamoDB table, reducing the need for frequent S3 queries.

## Chatbot Functionality with Amazon Bedrock: Empowering Engagement

This application includes a chatbot module that, as an **(MVP)**, demonstrates the potential of artificial intelligence to optimize user interaction and, in the future, support VFS Castanhas operations. The integration with **Amazon Bedrock** establishes a foundation for future expansions and enhancements.

### Business Overview and Potential (MVP)

In the context of an MVP, the chatbot acts as an initial and informative point of contact. It offers:

- **Basic Availability:** Allows users to obtain fundamental information, such as address and contact (WhatsApp), in an automated way.
- **First Impressions:** Although in the initial phase, the presence of a virtual assistant already improves the perception of modernity and accessibility of the business.
- **Validation of Interest:** Interaction with the chatbot can help validate users' interest in automated communication channels, providing initial data for future product decisions.
- **Base for Evolution:** The serverless architecture already implemented allows the functionality to be easily expanded to meet more complex scenarios, such as dynamic FAQs, order support or advanced personalization.

### Technical Details: Architecture and Implementation

The chatbot functionality is implemented using AWS serverless services, ensuring scalability and efficiency from the MVP:

1. **Frontend (React):** The chatbot interface in React collects the user's message and sends it to the backend.
2. **API Gateway and AWS Lambda:** Messages are routed via API Gateway to an AWS Lambda function. This Lambda is the central orchestrator.

   - **User ID Extraction:** To contextualize the conversations, Lambda tries to extract the `userid` from the AWS Cognito authentication context (`event['requestContext']['identity']['cognitoAuthenticationProvider']`). This ID is essential to associate the message history with each user.
   - **Interaction Persistence (DynamoDB):** All messages, both from the user and the assistant's responses, are persisted in a dedicated DynamoDB table (`dynamo01vfscastanhaschatbot`). The `persist_data` function uses an `UpdateExpression` operation to add new messages to an existing list or create a new record for the user. For the `/chat` route, Lambda can also perform `GET` operations on this DynamoDB table to retrieve the user's conversation history.

3. **Integration with Amazon Bedrock:**

   - **Model Invocation:** Lambda uses `boto3` to interact with Amazon Bedrock Runtime. The `amazon.nova-micro-v1:0` model is invoked with a JSON payload that includes the user's message and a `system_prompt`. The `system_prompt` defines the basic persona of the chatbot ("Cajuzinho") and injects static information, such as the address and WhatsApp number.
   - **Response Processing:** The response from Bedrock is read and the text content is extracted to be sent back to the frontend and also persisted in DynamoDB as the assistant response.

This architecture allows the chatbot to function autonomously for basic queries, serving as a functional proof of concept and a solid foundation for future iterations and more complex AI-based functionality.

## Benefits of Using AWS Amplify

AWS Amplify offers a comprehensive set of tools and services to help you build, deploy, and manage your application. With Amplify, you can take advantage of the following benefits:

- **Project Management**: \
  Amplify lets you easily manage your project from a single dashboard, including code management, deployment, monitoring, and analytics.

- **Integration with AWS Services**: \
  Amplify integrates seamlessly with other AWS services, such as Cognito for authentication, API Gateway for API management, and S3 for static file storage.

- **Pipeline Configuration**: \
  Amplify provides a simple and intuitive way to set up your pipeline, including automated builds, tests, and deployments.

- **Automated Deployments**: \
  With Amplify, you can easily automate deployments to different environments with just a few clicks.

### What's the Alternative?

Let's take a look at what it would take to deploy a static website to S3 without using AWS Amplify. Here are the steps involved:

1. **Set Up CodeCommit for Source Control**

   - Create a new repository in CodeCommit and push your code there.
   - Configure your local machine to use CodeCommit as your source control repository.

2. **Set Up S3 for Static Website Hosting**

   - Create a new bucket in S3 and configure it as a static website host.
   - Upload your website files to the bucket using the AWS CLI or the S3 console.

3. **Set Up API Gateway for API Management (Optional)**

   - If you have an API, create a new REST API in API Gateway and configure it to integrate with your S3 bucket.
   - Set up API keys and usage plans as needed.

4. **Configure CloudWatch for Monitoring**

   - Create a new dashboard in CloudWatch to monitor your application’s performance metrics.
   - Configure alarms and notifications as needed.

5. **Configure CodePipeline for Automated Deployments**
   - Create a new pipeline in CodePipeline and configure it to integrate with CodeCommit, S3, and API Gateway (if applicable).
   - Configure automated builds, tests, and deployments using Jenkins or another CI/CD tool.

> As you can see, deploying a static website to S3 without using AWS Amplify takes a considerable amount of time and effort. With Amplify, you can enjoy the benefits of project management, integration with AWS services, pipeline configuration, and automated deployments with just a few clicks!

## :copyright: Copyright

**Developed by** [Andresinho20049](https://andresinho20049.com.br/) \
**Project**: VFS Castanhas LandingPage \
**Description**: \
This project was initially built using Lovable and later migrated to AWS Amplify for deployment. The website features a landing page with authentication enabled through AWS Cognito. [Visit the site at link for more information](https://amplify.d2crsg2ixs07i2.amplifyapp.com/) on the topic and subject.
