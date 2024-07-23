# Students Management System

This is a test task for the student management system which has been published on Webflow. Follow the instructions below to run the test task:

## Steps to Run the Test Task
1. Open your web browser and go to the following URL: [Student Management System](https://student-management-system-18bcf3.webflow.io/)
2. Once the website is loaded, you will see the student management system interface.
3. I also sent your email address (gerber@candidmaven.com) the invitation to my supabase project.

## Setup Supabase edge function locally and test the project
1. Install Docker Desktop
    Download from the below url and install:
   ```sh
   https://www.docker.com/products/docker-desktop/
   ```
3. Install supabase and deno cli
   Install the CLI with Scoop:
   ```sh
   scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
   scoop install supabase
    scoop install deno
   ```
4. Clone the project from Git
   ```sh
   git clone https://github.com/great-dev1/students_management_system
   cd students_management_system
   ```
5. Run the project locally
   ```sh
   supabase start
   supabase functions serve
   ```
6. Unit test the edge function
   ```sh
   deno test --allow-all supabase/functions/_tests/students_test.ts
   ```
