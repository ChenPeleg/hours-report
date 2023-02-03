# Git log

## Formats

There are several options to get the git log in a way that will be best for date manipulation.

Best way to handle the data is

`git log --pretty='%cd %ce %s' --graph --date=iso --date-order`

## The branch problem

For user convenience I tried to add to the report the branch name. The problem is that not ever commit is related to a
branch.

So the technique I used to assume the branch name was to

`git log --graph --decorate --oneline --pretty='%cd %ce %s'` 
