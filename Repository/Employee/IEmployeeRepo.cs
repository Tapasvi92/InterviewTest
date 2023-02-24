using InterviewTest.Model;
using System.Collections.Generic;

namespace InterviewTest.Repository
{
    public interface IEmployeeRepo
    {
        List<Employee> GetAllEmployee();
        KeyValuePair<int, string> CreateEmployee(Employee emp);
        KeyValuePair<int, string> UpdateEmployee(Employee emp);
        KeyValuePair<int, string> DeleteEmployee(string empName);
        ListOfSum ListOfSums();
        KeyValuePair<int, string> Incremental(string Name);
    }
}
