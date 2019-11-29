Feature: User register.

	User should be able to register to have an user friendly experience

	Scenario: User registers successfully
		Given username is 'zemilho', the password 'avocado12', the email "email@email.com" and the user adds a profile photo
		When I try to register
		Then I should be redirected to the homepage with a message assuring 'zemilho' was registered

	Scenario: User registers successfully without picture
		Given username is 'crocodila', the password 'avocado12' and the email "email@email.com"
		When I try to register with no picture
		Then I should be redirected to the homepage with a message assuring 'crocodila' was registered with no picture

    Scenario: Username already exists
        Given existing username is 'zemilho', the password 'avocado12', the email "email@email.com"
		When I try to register an existing username
		Then I should stay in the registry page with and error that the user was already taken

    Scenario: Username invalid
        Given invalid username is 'aaaaaaaaaaaaaaaaaaaaaaaaaaa', the password 'avocado12', the email "email@email.com"
		When I try to register with an invalid username
		Then I should stay in the registry page with and error that the username is invalid

    Scenario: Email invalid 
        Given username is 'tololo', the password 'avocado12', the invalid email "emailemail.com"
		When I try to register with an invalid email
		Then I should stay in the registry page with and error that the email is invalid 

    Scenario: Password Invalid
        Given username is 'claclacla', the invalid password '1234', the email "email@email.com"
		When I try to register with an invalid password
		Then I should stay in the registry page with and error that the password is invalid