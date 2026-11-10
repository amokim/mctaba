-- Task 1: Write 10 SQL Queries

--Query 1: Select all students from nairobi
select id, name, email, age, town from students where town = 'Nairobi';

-- Query 2: Select all courses with more than 3 credits, ordered by name alphabetically
select id, name, code, credits from courses where credits > 3 order by name;

-- Query 3: Select student names and their enrolled course names using JOIN
select students.name as student_name, courses.name as course_name from enrollments 
inner join students on enrollments.student_id = students.id
inner join courses on enrollments.course_id = courses.id
limit 5;

-- Query 4: Count how many students are enrolled in each course. Order by count descending
select courses.name as course_name, count(enrollments.id) as student_count from courses
left join enrollments on courses.id = enrollments.course_id
group by courses.name
order by student_count desc;

-- Query 5: Find all students older than 22, sorted by age descending
select name, age, town from students
where age > 22
order by age desc;

-- Query 6: Find the average grade across all enrollments
select avg(grade) as avg_grade from enrollments;

-- Query 7: Find the highest and lowest grade in the enrollments table
select max(grade) as highest_grade, min(grade) as lowest_grade from enrollments;

-- Query 8: Select students whose names start with a vowel (A, E, I, O, U)
select name from students where name ~ '^[AEIOU]';

-- Query 9: Find all courses in the Computer Science department (join courses with teachers)
select courses.name as course_name, teachers.name as teacher_name from courses
inner join teachers on teachers.id = courses.teacher_id
where teachers.department = 'Computer Science';

-- Query 10: Count how many students are from each town, only showing towns with more than 1 student.
select town, count(id) as student_count  from students
group by town
having count(id) > 1;

--Task 2: Answer Business Questions
--Question 1: Which teacher has the most students across all their courses? Display the teacher name and total number of unique students
select teachers.name as teacher_name, count(distinct enrollments.student_id) as total_students 
from courses
inner join enrollments on enrollments.course_id = courses.id
inner join teachers on teachers.id = courses.teacher_id
group by teachers.id, teachers.name
order by total_students desc
limit 1;

-- Question 2: What is the average grade per course? Display course name and average grade, sorted by average grade descending
select courses.name as course_name, round(avg(enrollments.grade),2) as avg_grade from courses
inner join enrollments on enrollments.course_id = courses.id
group by courses.name
order by avg_grade desc;

-- Question 3: Which students are enrolled in more than 3 courses? Display student name and course count
select students.name as student_name, count(enrollments.course_id) as course_count
from students
inner join enrollments on enrollments.student_id = students.id
group by student_name
having count(enrollments.course_id) > 3;

-- Task 3: Data Modifications
--3a: INSERT 5 new students with Kenyan names and towns
INSERT INTO students (name, email, age, town)
values
  ('Njeri Maina', 'njeri@student.ac.ke', 20, 'Nyeri'),
  ('Kamau Githuku', 'kamau.g@student.ac.ke', 22, 'Kiambu'),
  ('Atieno Owino', 'atieno@student.ac.ke', 21, 'Homa Bay'),
  ('Baraka Mwiti', 'baraka@student.ac.ke', 23, 'Meru'),
  ('Zawadi Chebet', 'zawadi@student.ac.ke', 19, 'Kericho');

--3b: UPDATE the grades for all enrollments in course_id 1 (Introduction to Programming) -- increase each grade by 5 points (but cap at 100)
update enrollments 
set grade = least(grade + 5, 100) where course_id = 1;

--3c: DELETE all students who have no enrollments (the 5 students you just inserted have no enrollments)
delete from students
where id not in (select student_id from enrollments);

-- Bonus challenge - Write a complex subquery to find all students whose average grade is above the overall class average
 select students.name, avg(enrollments.grade) from students
join enrollments on students.id = enrollments.student_id
group by students.name
having avg(enrollments.grade) > (select avg(grade) from enrollments);