# Week 6 Day 1 Assignment: SQL Queries

PostgreSQL queries against a school database with `students`, `teachers`, `courses` and `enrollments` tables. All of the SQL is in [queries.sql](queries.sql).

## Contents

- [Task 1: Write 10 SQL Queries](#task-1-write-10-sql-queries)
- [Task 2: Answer Business Questions](#task-2-answer-business-questions)
- [Task 3: Data Modifications](#task-3-data-modifications)
- [Bonus Challenge](#bonus-challenge)

## Task 1: Write 10 SQL Queries

### Query 1: Select all students from Nairobi

```sql
select id, name, email, age, town from students where town = 'Nairobi';
```

![Query 1 result](screenshots/query-01.png)

### Query 2: Select all courses with more than 3 credits, ordered by name alphabetically

```sql
select id, name, code, credits from courses where credits > 3 order by name;
```

![Query 2 result](screenshots/query-02.png)

### Query 3: Select student names and their enrolled course names using JOIN

```sql
select students.name as student_name, courses.name as course_name from enrollments
inner join students on enrollments.student_id = students.id
inner join courses on enrollments.course_id = courses.id
limit 5;
```

![Query 3 result](screenshots/query-03.png)

### Query 4: Count how many students are enrolled in each course, ordered by count descending

```sql
select courses.name as course_name, count(enrollments.id) as student_count from courses
left join enrollments on courses.id = enrollments.course_id
group by courses.name
order by student_count desc;
```

![Query 4 result](screenshots/query-04.png)

### Query 5: Find all students older than 22, sorted by age descending

```sql
select name, age, town from students
where age > 22
order by age desc;
```

![Query 5 result](screenshots/query-05.png)

### Query 6: Find the average grade across all enrollments

```sql
select avg(grade) as avg_grade from enrollments;
```

![Query 6 result](screenshots/query-06.png)

### Query 7: Find the highest and lowest grade in the enrollments table

```sql
select max(grade) as highest_grade, min(grade) as lowest_grade from enrollments;
```

![Query 7 result](screenshots/query-07.png)

### Query 8: Select students whose names start with a vowel (A, E, I, O, U)

```sql
select name from students where name ~ '^[AEIOU]';
```

![Query 8 result](screenshots/query-08.png)

### Query 9: Find all courses in the Computer Science department (join courses with teachers)

```sql
select courses.name as course_name, teachers.name as teacher_name from courses
inner join teachers on teachers.id = courses.teacher_id
where teachers.department = 'Computer Science';
```

![Query 9 result](screenshots/query-09.png)

### Query 10: Count how many students are from each town, only showing towns with more than 1 student

```sql
select town, count(id) as student_count  from students
group by town
having count(id) > 1;
```

![Query 10 result](screenshots/query-10.png)

## Task 2: Answer Business Questions

### Question 1: Which teacher has the most students across all their courses?

Displays the teacher name and total number of unique students.

```sql
select teachers.name as teacher_name, count(distinct enrollments.student_id) as total_students
from courses
inner join enrollments on enrollments.course_id = courses.id
inner join teachers on teachers.id = courses.teacher_id
group by teachers.id, teachers.name
order by total_students desc
limit 1;
```

![Question 1 result](screenshots/question-1.png)

### Question 2: What is the average grade per course?

Displays the course name and average grade, sorted by average grade descending.

```sql
select courses.name as course_name, round(avg(enrollments.grade),2) as avg_grade from courses
inner join enrollments on enrollments.course_id = courses.id
group by courses.name
order by avg_grade desc;
```

![Question 2 result](screenshots/question-2.png)

### Question 3: Which students are enrolled in more than 3 courses?

Displays the student name and course count.

```sql
select students.name as student_name, count(enrollments.course_id) as course_count
from students
inner join enrollments on enrollments.student_id = students.id
group by student_name
having count(enrollments.course_id) > 3;
```

![Question 3 result](screenshots/question-3.png)
