using InterviewTest.Model;
using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;

namespace InterviewTest.Repository
{
    public class EmployeeRepo : IEmployeeRepo
    {
        public KeyValuePair<int, string> CreateEmployee(Employee emp)
        {            
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            int outPut = 0;
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"INSERT INTO Employees (Name, Value) VALUES ('" + emp.Name + "', " + emp.Value + ") ";
                outPut = queryCmd.ExecuteNonQuery();

            }
            return new KeyValuePair<int, string>(outPut, emp.Name);
            
            //throw new System.NotImplementedException();
        }

        public KeyValuePair<int, string> DeleteEmployee(string empName)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            int outPut = 0;
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"Delete From Employees Where Name = '" + empName + "'";
                outPut = queryCmd.ExecuteNonQuery();
                
            }
            return new KeyValuePair<int, string>(outPut, empName);
            //throw new System.NotImplementedException();
        }

        public List<Employee> GetAllEmployee()
        {
            var employees = new List<Employee>();
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"SELECT Name, Value FROM Employees";
                using (var reader = queryCmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        employees.Add(new Employee
                        {
                            Name = reader.GetString(0),
                            Value = reader.GetInt32(1)
                        });
                    }
                }
            }
            return employees;
            //throw new System.NotImplementedException();
        }

        public KeyValuePair<int, string> UpdateEmployee(Employee emp)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            int outPut = 0;
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"UPDATE Employees SET Value = " + emp.Value + " Where Name = '" + emp.Name + "'";

                outPut = queryCmd.ExecuteNonQuery();

            }
            return new KeyValuePair<int, string>(outPut, emp.Name);
            //throw new System.NotImplementedException();
        }

        public ListOfSum ListOfSums()
        {
            var SumVal = new ListOfSum();

            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"With Sum_of_Emp AS (
                                            SELECT (SELECT Sum(Value) FROM Employees
                                                WHERE Name like 'A%') AS A ,(SELECT SUM (Value) FROM Employees
                                                WHERE Name like 'B%' ) AS B,(SELECT SUM (Value) FROM Employees
                                                WHERE Name like 'C%') AS C)
                                        SELECT 
                                            CASE WHEN A > 11174 THEN A ELSE 0 END A,
                                            CASE WHEN B > 11174 THEN B ELSE 0 END B,
                                            CASE WHEN C > 11174 THEN C ELSE 0 END C
                                            FROM Sum_of_Emp";

                using (var reader = queryCmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        SumVal.A = reader.GetInt32(0);
                        SumVal.B = reader.GetInt32(1);
                        SumVal.C = reader.GetInt32(2);
                    }
                }

            }
            
            return SumVal;
        }

        public KeyValuePair<int, string> Incremental(string Name)
        {
            
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            int outPut;
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();
                var queryCmd = connection.CreateCommand();
                switch (Name[0])
                {
                    case 'E':
                        queryCmd.CommandText = @"UPDATE Employees SET Value = Value + 1 Where Name = '" + Name +  "'";
                        break;
                    case 'G':
                        queryCmd.CommandText = @"UPDATE Employees SET Value = Value + 10 Where Name = '" + Name + "'";
                        break;
                    default:
                        queryCmd.CommandText = @"UPDATE Employees SET Value = Value + 100 WHERE Name = '" + Name + "'";
                        break;
                }
                
                
                outPut = queryCmd.ExecuteNonQuery();               

            }

            return new KeyValuePair<int, string>(1, "Increment successfully");
        }
    }
}
