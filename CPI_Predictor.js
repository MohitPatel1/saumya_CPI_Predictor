document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("add-course").addEventListener("click", addCourse);
    document.getElementById("remove-course").addEventListener("click", removeCourse);
    document.getElementById("calculate").addEventListener("click", calculateCPI);

    let no_of_courses = 5;
    function validateFields()
    {
        let cpi_vf = document.getElementById("cpi").value;
        if(cpi_vf == "" || cpi_vf > 10 || cpi_vf < 0)
        {
            alert("Please Enter Valid CPI");
            return false;
        }

        let total_credits = document.getElementById("total-credits").value;

        if(total_credits =="" || total_credits < 0 )
        {
            alert("Please Enter Valid Total Credtis");
        }

        let ptrs_class = document.getElementsByClassName("ptrs");
        
        let credits_class = document.getElementsByClassName("credits");
        for(let element of credits_class)
        {
            if(element.value == "" || element.value <2 || element.value > 5)
            {
                alert("Please Enter Valid Credits");
                return false;
            }
        }

        for(let element of ptrs_class)
        {
            if(element.value == "" || element.value < 0 || element.value > 10)
            {
                alert("Please Enter Valid Expected Pointers");
                return false;
            }
        }

        return true;
    }
    function calculateCPI() {

        if (validateFields()) {
            let curr_cpi = document.getElementById("cpi").value;
            let credits = document.getElementById("total-credits").value;

            let prev_gradepts = credits * curr_cpi;

            const expected_ptrs = document.getElementsByClassName("ptrs");
            const new_credits = document.getElementsByClassName("credits");

            let earned_gradepoints = 0;
            let this_sem_credits = 0;
            for (let i = 0; i <= no_of_courses - 1; i++) {
                credits = parseFloat(credits) + parseFloat(new_credits[i].value);

                earned_gradepoints = parseFloat(earned_gradepoints) + (parseFloat(new_credits[i].value) * parseFloat(expected_ptrs[i].value));

            }
            let total_gradepoints = parseFloat(earned_gradepoints) + parseFloat(prev_gradepts);
            let new_cpi = (parseFloat(total_gradepoints) / parseFloat(credits));

            document.querySelector("#ans_header").innerHTML ="Your CPI after this Semeseter : " + new_cpi.toFixed(2);
            document.getElementById("ans_header").style.display="block";
        }
    }


    function addCourse() {

        if (no_of_courses <= 6) {
            no_of_courses += 1;
            const label = document.createElement("label");
            const node = document.createTextNode("Course" + no_of_courses);

            label.appendChild(node);

            let grid = document.getElementsByClassName("css-grid");
            grid[0].appendChild(label);

            let input1 = document.createElement("input");
            input1.setAttribute("type", "number");
            input1.setAttribute("class", "credits");
            grid[0].appendChild(input1);

            let input2 = document.createElement("input");
            input2.setAttribute("type", "number");
            input2.setAttribute("class", "ptrs");
            grid[0].appendChild(input2);
        }
        else {
            alert("You can maximum have 7 courses");
        }
    }

    function removeCourse() {

        if (no_of_courses > 5) {
            no_of_courses--;
            let grid = document.getElementsByClassName("css-grid");
            grid[0].lastChild.remove();
            grid[0].lastChild.remove();
            grid[0].lastChild.remove();
        }
        else {
            alert("You have to be enrolled in minimum 5 courses");
        }

    }

})
