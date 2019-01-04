# Mean Stack Application
<h2>Project Manager Case Study Build Notes:</h2>
<h3>Application Structure</h3>
<ul>
	<li>Client side – Angular</li>
	<li>Server side – Express</li>
	<li>Database – MongoDB</li>
</ul>
<h3>Required Software’s</h3>
<ul>
	<li>Node JS</li>
	<li>MongoDB</li>
	<li>Visual Studio Code (Any IDE)</li>
	<li>Robo Mongo (Any IDE)</li>
	<li>Docker</li>
	<li>Jenkins</li>
</ul>
<h3>Client side – Angular</h3>
<p>Angular CLI for building the UI and connects with REST endpoints exposed from server side (express)</p>
<b>Start Application</b>
<ul>
	<li>npm install</li>
	<li>npm start - To start the application</li>
	<li>npm test - To test the test cases</li>
</ul>
<p>Hit <a href="http://localhost:4200/" target="_parent">http://localhost:4200/</a> this url in browser to view the client side application, the changes will be automatically reflect when we save the changes</p>

<h3>Server Side – Express</h3>
<p>Express JS for exposing REST endpoints with MongoDB.</p>
<b>Start Application</b>
<ul>
	<li>Change the MongoDB connect path from "database" to "localhost:27017" to setup in local environment</li>
	<li>npm install</li>
	<li>node app.js - To start the application</li>
</ul>
<p>Hit <a href="http://localhost:3030/api/user/getUser" target="_parent">http://localhost:3030/api/user/getUser </a> this url in POSTMAN to view the list users in GET method</p>

<h3>Database – MongoDB</h3>
<p><b><i>Set DB path to run MongoDB:</b></i> mongodb-4.0\bin>mongod –dbpath “...\project-manager\db”</p>

<h3>Docker</h3>
<b>Commands:</b>
<ul>
	<li>docker-compose up - To run the docker to create images</li>
	<li>docker-compose up --build - To update the changes to already created images</li>
	<li>docker-compose up down - To stop and remove the images</li>
	<li>docker-compose up -d - To run and update the images</li>
</ul>
<p>This will install all the required packages for Angular, Express and MongoDB.</p>
<p>Client – Angular: <a href="http://localhost:4200/">http://localhost:4200/</a></p>
<p>Server – Express: <a href="http://localhost:3030/api/user/getUser ">http://localhost:3030/api/user/getUser </a></p>
<b>To check in curl comments</b>
<p>docker exec –it <i>container_id</i> sh</p>
<p><strong>Angular: </strong> curl <a href="http://localhost:4200/">http://localhost:4200/</a></p>
<p><strong>Express - Get Task: </strong> curl <a href="http://localhost:3030/api/task/getTask">http://localhost:3030/api/task/getTask</a></p>
<p><strong>Express - Get Project: </strong> curl <a href="http://localhost:3030/api/project/getProject">http://localhost:3030/api/project/getProject</a></p>
<p><strong>Express - Get User: </strong> curl <a href="http://localhost:3030/api/user/getUser">http://localhost:3030/api/user/getUser</a></p>


<h3>Jenkins</h3>
<ul>
	<li>Make sure Jenkins installed and running</li>
	<li>Create Jenkins project and configure the below informations</li>
	<ol>
		<li>Github repository with credentials</li>
		<li>Branch to build: */master</li>
		<li>Add build command in Execute Windows batch command option: docker-compose up -d</li>
	</ol>
</ul>
