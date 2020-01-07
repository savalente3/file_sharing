**_# fileSharing_**

_software engineering project: File sharing_

When uploading a file to share between users, the sender can choose between drag and drop or search the file. Once sent, the receiver gets and email with a link to download the file. To download, the receiver must be logged in to get access to the list of files available to download. Each file is only available for 3 days or until it is downloaded. The receiver can also preview the files and get information such as format, size, date and time of upload and remaining time until deletion.

Team Members 


**Dependencies**
 -  Koa
 - nodeJS
 - Cucumber
 - Jest
 - ESLint


***: Basic features**
**Logged-in users upload files to the server.**
**Email a link to download the file.**
**The files are not stored in the public directory.**
**The download link with a # string, not the file name.**

****: intermediate features**
**Files are deleted after downloaded or after 3 days.**
**All files should download.**

*****: advanced features**
**Choose the username of who can access it.**
**This username must already exist.**
**Logged in user have a list of the files they can download.**
**All files in the list should have: type of file, size, date and time of upload and time until deletion.**

**Team members**


| [Alfonzo](https://github.coventry.ac.uk/alfonzoj/)                           | [Eduardo](https://github.coventry.ac.uk/cruzfrae)                                        | [Guilherme](https://github.coventry.ac.uk/deoliveg)         | [Hassan](https://github.coventry.ac.uk/sultanh5)       | [Josh](https://github.coventry.ac.uk/handley7)         | [Preeth](https://github.coventry.ac.uk/selvamop)          | [Sofia](https://github.coventry.ac.uk/valente3)          |               
| :---:                                           |     :---:                                    |     :---:      |         :---: |         :---: |    :---:      |:---:      |
|                                                 |                                              |                |               |               |               |                |
| <img src="authors/alfonzo.jpg" width="100">| <img src="authors/eduardo.jpg" width="100"> |<img src="authors/gui.jpg" width="100">                | <img src="authors/hassan.jpg" width="100">   | <img src="authors/josh.jpg" width="100"> | <img src="authors/preeth.jpg" width="100">             | <img src="authors/sofia.jpg" width="100">

______________________________________________________________________________________________________________________________

*Installation*

The install the packages: 
- `npm install`

______________________________________________________________________________________________________________________________

*Git*

Tutorial on how to work with git branches: 
- https://rogerdudler.github.io/git-guide/
	
______________________________________________________________________________________________________________________________

*Running*
- `npm run start`
______________________________________________________________________________________________________________________________

*Debugging*

Debugging can be made with VS Code by pressing `f5` or with `nmp run watch`

______________________________________________________________________________________________________________________________

*Folder Structure*

<pre>
Valente3/
├── index.js
├── README.md
│     
├── modules/
│   └── user.js
│   
├──public/    
│     ├── avatars/
│     │   └──avatar.png
│     ├──images/
│     │   ├──bell.svg
│     │   ├──logo.pn
│     │   ├──facebook.svg
│     │   ├──instagram.svg
│     │   ├──linkedin.svg
│     │   ├──search.svg
│     │   ├──subject.svg
│     │   └──twitter.svg
│     ├──css/
│     │   └──tylesheet.css
│     └──style.css
│ 
├──unit tests/
│     └──user.spec.js  
│
├──views/
│     ├──error.handlebars
│     ├──index.handlebars
│     ├──login.handlebars
│     ├──register.handlebars
│     ├──nav.hatml
│     ├──about.html
│     ├──download.html
│     ├──footer.html
│     └──homepage.html
│
├──authors/
│     ├──sofia.png
│     ├──josh.png
│
└──layout/
      ├──abput page.png
      ├──contacts page.png
      ├──homepage.png
      ├──log-in pop-up.png
      ├──my downloads.png
      ├──username.png
      └──website layout.xd
</pre>



 
