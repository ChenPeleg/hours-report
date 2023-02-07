---
title : how it works
order: 1
--- 
 
The process runs a `git log` command and then analyzes the results, of your commits. The default is the current fit user. For more information see `options`.

### Calculating work sessions

Two settings are used to calculate the session from the logs:

- **max-diff-for-session** - maximum difference in minutes between commits counted to one session. Default: 120
- **min-session** = how many minutes the first commit of a session should add to total. Default: 30

Imaging this is your work day, and the circles represent the commits over time:

<div markdown=1 style="border-radius: 5px; box-shadow: 0px 0px 5px 2px rgba(200,198,196,0.41); padding: 10px 30px 0px 30px; background-color: #fff1c4">

![commits across the day](/assets/img/commit-diagram-1.svg)
</div>

The calculation is like this:

1. We check the time differences between commits:
  <div markdown=1 style="border-radius: 5px; box-shadow: 0px 0px 5px 2px #c8c4c469; padding: 10px 30px 0px 30px; background-color: #fff1c4">
  
  ![commits across the day](/assets/img/commit-diagram-2.svg)
  </div>
2. If the diffrence is less than the value of **max-diff-for-session**, than the commits are grouped to one work session. If the difference is greater, than they are on different session.
<div markdown=1 style="border-radius: 5px; box-shadow: 0px 0px 5px 2px #c8c4c469; padding: 10px 30px 0px 30px; background-color: #fff1c4">

![commits across the day](/assets/img/commit-diagram-3.svg)
</div>
3.  Each **work session** is added with the **min-session** value, to represent the time spent before the first commit.  
<div markdown=1 style="border-radius: 5px; box-shadow: 0px 0px 5px 2px #c8c4c469; padding: 10px 30px 0px 30px; background-color: #fff1c4">

![commits across the day](/assets/img/commit-diagram-4.svg)
</div>
4. **Work sessions** that are on the same date are grouped together to form a work **day**:
<div markdown=1 style="border-radius: 5px; box-shadow: 0px 0px 5px 2px #c8c4c469; padding: 10px 30px 0px 30px; background-color: #fff1c4">

![commits across the day](/assets/img/commit-diagram-5.svg)
</div>

### Result

The work days are concluded in a table ike this:

| Day  | Hours |                              Details |
|:-----|:------|-------------------------------------:|
| 20.1 | 5     | First commit message; second commit; |
| 21.1 | 4     | My_Branch_name_#1; My_branch_Name_#2 |
| 23.3 | 7     |                  Feature_branch_#114 |

The table contains a summary for all days, for each month, and total. The months are arranged by year.

### Details

The detail column contains only partial information received from the git log:
 
- branch names if are any (until a certain limit of characters per day)\
- commit messages (until a certain limit of characters per day)




