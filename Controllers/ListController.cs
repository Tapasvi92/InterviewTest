using Microsoft.AspNetCore.Mvc;

namespace InterviewTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListController : ControllerBase
    {
        public ListController()
        {
            /*

            With Sum_of_Emp AS (
            select (select Sum(Value) from Employees
            where Name like 'A%') AS A ,(select SUM (Value) from Employees
            where Name like 'B%' ) AS B,(select SUM (Value) from Employees
            where Name like 'C%') AS C
	            )

            Select 
            CASE WHEN A > 11174 THEN A ELSE 0 END A,
            CASE WHEN B > 11174 THEN B ELSE 0 END B,
            CASE WHEN C > 11174 THEN C ELSE 0 END C
            FROM Sum_of_Emp

            */
        }

        /*
         * List API methods goe here
         * */
    }
}
