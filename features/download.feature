Feature: User login.

	User should be able to log in to have an user friendly experience

	Scenario: User logs in successfully
		Given username is 'human' and the password 'avocado12'
		When I try to log in
		Then I should be redirected to the homepage with a message assuring I was logged in

	Scenario: User provides incorrect password
		Given username is 'human' and the password 'avocado12'
		When I try to log in
		Then I should be asked to try again with an error telling me the password was incorrect
    
	Scenario: User provides unregistered username
		Given username is 'human' and the password 'avocado12'
		When I try to log in
		Then I should be asked to try again with an error telling me the username doesn't exist