using InterviewTest.Model;
using InterviewTest.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;

namespace InterviewTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepo empRepo;

        public EmployeesController(IEmployeeRepo empRepo)
        {
            this.empRepo = empRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var retVal = empRepo.GetAllEmployee();
                return Ok(retVal);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost]
        public IActionResult Post(Employee employee)
        {
            try
            {
                var retVal = empRepo.CreateEmployee(employee);
                return Ok(retVal);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        public IActionResult Put(Employee employee)
        {
            try
            {
                var retVal = empRepo.UpdateEmployee(employee);
                return Ok(retVal);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{empName}")]
        public IActionResult Delete(string empName)
        {            
            try
            {
                var retVal = empRepo.DeleteEmployee(empName);
                return Ok(retVal);
            }
            catch(Exception ex)
            { return BadRequest(ex.Message); }
            
        }

        [HttpGet("{Id}")]
        public IActionResult ListOFSum(int Id)
        {
            try
            {
                var retVal = empRepo.ListOfSums();
                return Ok(retVal);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{Id}")]
        public IActionResult Incremental(string Id)
        {
            try
            {
                var retVal = empRepo.Incremental(Id);
                return Ok(retVal);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
