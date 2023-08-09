# Book_Recommender
Book Recommender is a website in which USER get recommendation of books based on previous Genres 

### To run the frontend 
Enter the following code in terminal from root of the directory
```bash
npm start
```
### To run the backend
Enter the following code in terminal from root of the directory
```bash
go run .
```
### First Connect Database to the Server
Enter the below command it will open the mongodb shell in termial.<br>
mongodb Database by default it use port 27017
```bash
mongosh
```
### To Check the connection<br>
First check which **init system** you are using<br>
Type the following in terminal, for Linux users.
```bash
ps --no-headers -o comm 1
```
If you are using **systemd** (which uses <ins>**systemctl**</ins> command) otherwise **System V Init** (which uses <ins>**service**</ins> command)<br><br>
In my case I'm using <ins>**systemd**</ins><br>
<br>
Enter the below command to start mongoDB
```bash
sudo systemctl start mongod
```
The above command tells you that the connection is **Active or not**.<br>
<br>
And to check the connection status, type the following in terminal
```bash
sudo systemctl status mongod
```
And for disconnection
```bash
sudo systemctl stop mongod
```
<br>

For System V Init 
<br>
<br>
use the following code to start the mongodb

```bash 
sudo service mongod start
```
Replace <ins>**start**</ins> with <ins>**status**</ins> to check the status of the connection and <ins>**stop**</ins> for stop the connection
