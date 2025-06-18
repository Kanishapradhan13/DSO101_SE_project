# BMI Calculator CI/CD Pipeline Project

## Project Overview

This project creates a BMI (Body Mass Index) Calculator using a complete web application with automatic deployment. Think of it like building a calculator that works on the internet and gets updated automatically whenever we make changes!

## Objectives

- Build a BMI Calculator: Create a web app where users can calculate their BMI

- Store Data: Save BMI calculations in a database so we can see history

- Use Docker: Package our app in containers (like shipping boxes for code)

- Automate Everything: Set up robots (Jenkins & GitHub Actions) to deploy our app automatically

- Deploy Online: Put our app on the internet so anyone can use it

## Implementation Steps

## Basic set up

### Step 1: Set Up Development Environment

- Fork and clone the repository

- Start the development environment:

![alt text](<images/Screenshot from 2025-06-08 20-10-39.png>)

![alt text](<images/Screenshot from 2025-06-08 20-10-50.png>)

![alt text](<images/Screenshot from 2025-06-08 20-10-58.png>)

### Step 2: Implement the Database Migration

![alt text](images/image.png)

### Step 3: Add Backend Code

BMI Controller: Handled the business logic for calculating BMI and managing database operations

BMI Routes: Defined the API endpoints for the BMI service

### Step 4: Create Frontend Components

Form inputs for height, weight, and age

BMI calculation and result display

History viewing to see past BMI calculations

Responsive styling that looks professional

![alt text](<images/Screenshot from 2025-06-09 01-19-53.png>)

create a knexfile.js in the backend directory to configure the database connection for migrations.

### step 5 : Test the BMI API

POST: Returns a JSON object with BMI ~22.86 and category "Normal weight"

GET: Returns an array with your BMI records

GET latest: Returns the most recent BMI record

![alt text](<images/Screenshot from 2025-06-09 02-33-42.png>)

### step 6 : Start frontend

![alt text](images/fe.png)

![alt text](<images/Screenshot from 2025-06-09 02-42-46.png>)

![alt text](<images/Screenshot from 2025-06-09 02-43-19.png>)

#### accomplished till now

Complete PERN Stack Implementation

BMI Calculator Service - Fully functional with all requirements

Database Persistence - Storing and retrieving user BMI data

API Integration - Frontend successfully calling backend

## Stage 1: Docker Configuration

### step 1 : Configure Docker Volumes for BMI Data

update docker compose with bmi data volumes to ensure your PostgreSQL data (including BMI records) persists across container restarts.

### Step 2: Create Volume Directories

![alt text](images/volumes.png)

### Step 3: Test BMI data persistence

BMI API working - Creating records successfully

Data persistence - Records survive container restarts

![alt text](<images/Screenshot from 2025-06-09 03-21-57.png>)

![alt text](<images/Screenshot from 2025-06-09 03-26-28.png>)

### step 4: run BMI tests directly

![alt text](<images/Screenshot from 2025-06-09 03-34-05.png>)

#### accomplished till now

BMI data persisting across container restarts

All tests passing in the Docker environment

Proper volume configuration for data storage

## Stage 2: Jenkins Local Setup for GitHub Push Automation

Github credentials and personal access token are used from the previous assignments

### Step 1: Create Jenkins Pipeline Job

![alt text](images/pipeline.png)

### Step 2: Create Jenkinsfile in Your Project Root

![alt text](images/jenkinsfile.png)

### Step 3: Pipeline Configuration 

Build Triggers:

### Step 4: Commit with "@push" in the commit message

Build gets triggered in jenkins and is successful

![alt text](<images/Screenshot from 2025-06-09 04-30-19.png>)

![alt text](<images/Screenshot from 2025-06-09 15-17-33.png>)

Successful execution of tests and the report file generated

![alt text](<images/Screenshot from 2025-06-09 15-19-22.png>)

## Stage 3: GitHub Actions Pipeline for Docker Builds

### Step 1: Set Up Docker Hub Credentials in GitHub Secrets

![alt text](<images/Screenshot from 2025-06-09 15-27-11.png>)

### Step 2: Create GitHub Actions Workflow

![alt text](images/workflows.png)

### Step 3: Verify the Pipeline

Actions tab

![alt text](<images/Screenshot from 2025-06-09 16-09-15.png>)

Check Docker Hub

![alt text](<images/Screenshot from 2025-06-09 16-10-25.png>)

## Stage 3: Deploy to Render

### Deploy PostgreSQL Database

Create Database Service

Select "PostgreSQL"

Configure the database:

Name: bmi-calculator-db

Database Name: bmi_calculator

User: admin

![alt text](<images/Screenshot from 2025-06-09 16-33-09.png>)

![alt text](<images/Screenshot from 2025-06-09 16-34-42.png>)

Save these credentials for later use in deploying the backend

![alt text](<images/Screenshot from 2025-06-09 16-37-50.png>)

### Deploy Backend API Service

Deploy from Docker Registry

![alt text](<images/Screenshot from 2025-06-09 16-39-51.png>)

In "Environment Variables" section, add: Database Internal URL

![alt text](<images/Screenshot from 2025-06-09 23-30-39.png>)

Deploy backend

![alt text](<images/Screenshot from 2025-06-10 00-15-26.png>)

![alt text](<images/Screenshot from 2025-06-10 02-24-00.png>)

![alt text](images/api.png)

### Deploy Frontend React App

Deploy from Docker Registry

![alt text](<images/Screenshot from 2025-06-10 00-20-28.png>)

In "Environment Variables" section, add: Backend URL

![alt text](<images/Screenshot from 2025-06-10 00-21-26.png>)

Deploy Frontend

![alt text](<images/Screenshot from 2025-06-10 00-41-59.png>)

![alt text](<images/Screenshot from 2025-06-10 00-43-05.png>)

connection with backend

![alt text](images/frontendapi.png)

BMI CALCULATED

![alt text](image.png)


## Challenges Faced & Solutions

### Challenge 1: Database Table Missing

Problem: BMI calculations failed because database table didn't exist

![alt text](<images/Screenshot from 2025-06-09 03-17-02.png>)

![alt text](<images/Screenshot from 2025-06-09 03-20-35.png>)

Solution: Created database setup endpoint to automatically create BMI table

![alt text](<images/Screenshot from 2025-06-09 03-21-57.png>)

### Challenge 2: Jenkins Authentication Issues

Problem: Jenkins couldn't connect to GitHub repository

Solution: Used Personal Access Tokens and proper credential configuration

### Challenge 3: Docker Build Failures

Problem: Database Dockerfile failed due to missing files

Solution: Simplified Dockerfile to use basic PostgreSQL image

### Challenge 4: Render Deployment Routing

Problem: Backend API endpoints returned "Endpoint not Found"

![alt text](<images/Screenshot from 2025-06-09 23-34-30.png>)

Solution: Fixed route registration in Express app.ts file


## Conclusion

This project successfully demonstrates a complete DevOps pipeline from development to production deployment

Successfully Completed:

Docker Configuration: All services containerized with persistent storage

CI/CD Pipeline: Automated testing and deployment working

Cloud Deployment: All services live on Render platform

Frontend: Beautiful, responsive BMI calculator interface

Backend: API endpoints responding and connected to database

Database: PostgreSQL database operational and connected

Minor Issues:

BMI calculation has internal server error (likely database schema mismatch)

This doesn't affect the overall architecture and CI/CD pipeline success

## Frontend: https://bmi-frontend-cihm.onrender.com/
## Backend API: https://bmi-backend-65dc.onrender.com/
## GitHub Repository: https://github.com/Kanishapradhan13/DSO101_SE_project














