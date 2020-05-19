import React, { Component } from 'react'
import Breadcrumb from '../components/Breadcrumb';
import { Link } from "react-router-dom";
// import TextInput from '../components/TextInput';
import axios from 'axios';
import baseurl from '../auth/Baseurl';

const API_URL = baseurl+'api/checknamestudent/getCourseByUserId?user_ID='
export default class Listcourse extends Component {

    state = {
        checknames : [],
        show: false,
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

      renderButtonclass(data,time){
          console.log(data,time)
        let courseID = (data.courseID)
        let studentID = (data.studentID)
        // let courseID = (time.courseID)
        if(time != null){
            return(
                <Link to={'/student/Checkname/'+courseID+"/"+studentID}>
                        <button type="button" className="btn btn-block btn-danger btn-sm" ><i class="fa fa-map-marker" aria-hidden="true"></i> บันทึกเวลาเรียน</button>
                </Link>
                // get data befor data to listcourse
                // หลังจากบันทึกเสร็จเรียบร้อยแล้ว ปุ่มเป็น สีเขียว
            );
        }else{
            return(
                <button type="button" className="btn btn-block btn-warning btn-sm" ><i class="fa fa-map-marker" aria-hidden="true"></i> ยังไม่ถึงเวลาเรียน</button>
            );
        }
      }


      renderUserName = (data) => {
        const firstName = (data.firstName);
        const lastName = (data.lastName);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);

      }

    componentDidMount = () =>{
        const script = document.createElement("script");
        script.src = '../js/ShowCourse/content.js';
        // script.async = true;
        document.body.appendChild(script);
        let user_ID = localStorage.getItem("username");

        axios.get(`${API_URL}`+user_ID)
        .then(res => {
        
          this.setState({ checknames: res.data });
        })
        .catch(error => {
          console.log("====>",error.status);
        });

    }


    render() {
        return (

             <div className="content-wrapper">
                <Breadcrumb header="รายการลงทะเบียนเข้าเรียน" subheader="" arrow={
                    [
                        // {"icon":"", "title":"นักศึกษา", "link":"#", "active":"active"}
                    ]
                } />
                <div className="content body">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-primary">
                                <div className="box-body table-responsive">
                                    <br />
                                    <table id="example7" class="table table-bordered table-striped" > 
                                        <thead>
                                            <tr>
                                                <th className="col-sm-1" tabIndex="0" aria-controls="example2" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">รหัสวิชา</th>
                                                <th className="col-sm-3" tabIndex="0" aria-controls="example2" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">ชื่อรายวิชา</th>
                                                <th className="col-sm-1" tabIndex="0" aria-controls="example2" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">บันทึกเวลาเข้าเรียน</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody >
                                            { this.state.checknames.map((checkname, i) => (
                                                <tr role="row">
                                                    <td>{checkname.data.courseCode}</td>
                                                    <td>{checkname.data.courseName}</td>
                                                    <td>{this.renderButtonclass(checkname.data,checkname.time)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}