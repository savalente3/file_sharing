**_# fileSharing_**

_software engineering project: File sharing_

When uploading a file to share between users, the sender can choose between drag and drop or search the file. Once sent, the receiver gets and email with a link to download the file. To download, the receiver must be logged in to get access to the list of files available to download. Each file is only available for 3 days or until it is downloaded. The receiver can also preview the files and get information such as format, size, date and time of upload and remaining time until deletion.

Team Members 


**Dependencies**
 -  Koa
 - nodeJS


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

______________________________________________________________________________________________________________________________

*Debugging*

Debugging can be made with VS Code by pressing `f5` or with `nmp run watch`
______________________________________________________________________________________________________________________________

*Folder Structure*

Valente3/<br />
├── index.js<br />
├── README.md<br />
│     <br />
├── modules/<br />
│   └── user.js<br />
│   <br />
├──public/ <br />   
│     ├── avatars/<br />
│     │   └──avatar.png<br />
│     ├──images/<br />
│     │   ├──bell.svg<br />
│     │   ├──logo.pn<br />
│     │   ├──facebook.svg<br />
│     │   ├──instagram.svg<br />
│     │   ├──linkedin.svg<br />
│     │   ├──search.svg<br />
│     │   ├──subject.svg<br />
│     │   └──twitter.svg<br />
│     ├──css/<br />
│     │   └──tylesheet.css<br />
│     └──style.css<br />
│ <br />
├──unit tests/<br />
│     └──user.spec.js <br /> 
│<br />
├──views/<br />
│     ├──error.handlebars<br />
│     ├──index.handlebars<br />
│     ├──login.handlebars<br />
│     ├──register.handlebars<br />
│     ├──nav.hatml<br />
│     ├──about.html<br />
│     ├──download.html<br />
│     ├──footer.html<br />
│     └──homepage.html<br />
│<br />
├──authors/<br />
│     ├──sofia.png<br />
│     ├──views/josh.png<br />
│<br />
└──layout/<br />
      ├──about page.png<br />
      ├──contacts page.png<br />
      ├──homepage.png<br />
      ├──log-in pop-up.png<br />
      ├──my downloads.png<br />
      ├──username.png<br />
      └──website layout.xd<br />




 