
import React, { Component } from 'react'
import axios from 'axios';
import service_uri from '../../components/variable/service_uri';
import Breadcrumb from '../../components/Breadcrumb';
import { Link } from "react-router-dom";

export default class Createstudent extends Component {

    
state = {
    sutdentByCourses:[],
    firstName : '',
    lastName : '',
    studentID: '',
    courseID:''

}

handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});

}

RefreshPage = () => { 
    window.location.href = 'http://localhost:3000/lecturer/Createstudentincourse/'+this.state.courseID+"/"+this.state.namecourse; 
}

componentDidMount(){
    let  courseID  = this.props.match.params.courseID;
    this.setState({'courseID' : courseID});
    // console.log(this.state.courseID)
    // console.log(courseID)
    this.getAllCourse(courseID);
}

getAllCourse = (courseID) => {
    const  namecourse = this.props.match.params.namecourse;
    this.setState({namecourse})

    axios.get(service_uri+'lecturers/get_all_sutdentByCourses?courseID='+courseID)
    .then(res => {
        this.setState({ sutdentByCourses: res.data });
    })
    .catch(error => {
        console.log("====>",error.status);
    });
}
handleSubmit = (event) =>{
   
    console.log(this.state.studentID +" ---- "+ this.state.courseID)
    event.preventDefault();

    if(this.state.studentID != ""){
        axios.post(service_uri+'lecturers/insert_studentByCourses', {
            studentID : this.state.studentID,
            courseID: this.state.courseID,
            })
            .then(res => {
            alert("บันทึกสำเร็จ")
            this.RefreshPage();
            })
            .catch(error => {
            console.log("====>",error.status);
            alert("รายชื่อซ้ำไม่สามารถเพิ่มได้")
    
        });
    }else{
        alert("กรุณาเลือกรายชื่อนักศึกษา")
    }

}


       render() {
        return (
            <div className="content-wrapper">
                <Breadcrumb header="สร้างนักศึกษาในรายวิชา "subheader={<h4>{this.state.namecourse}</h4>} arrow={
                    [
                        // {"icon":"", "title":"สร้างนักศึกษาในรายวิชา", "link":"#", "active":"active"}
                    ]
                } />
                <div className="content body">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="box box-primary">
                                <div className="box-body">
                                        <form onSubmit={this.handleSubmit}>
                                            <div class="modal-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div class="form-group">
                                                            <label for="lecturers" type="text" class="col-form-label">รายชื่อนักศึกษา (เลือกนักศึกษา)</label>
                                                            <select name="studentID" class="form-control multiple"  onChange={this.handleChange} multiple>
                                                                {/* <option value="">เลือกนักศึกษา</option> */}
                                                            { this.state.sutdentByCourses.map((sutdentByCourse,i) => (
                                                                <option value={sutdentByCourse.studentID}>{sutdentByCourse.firstName+' '+sutdentByCourse.lastName}</option>
                                                            )) }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <input type="hidden" name="" value=""/>
                                                <button type="submit" className="pull-right btn btn-success" onClick={ this.handleChange }>
                                                    <i className="fa fa-arrow-circle-right"></i> บันทึก
                                                </button>
                                                <Link to={'/lecturer/Createstudentincourse/'+this.state.courseID+"/"+this.state.namecourse}><button type="button" className="pull-right btn btn-danger"><i className="fa fa-arrow-circle-left"></i>  กลับ </button> </Link>
                                            </div>
                                        </form>
                                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
     
        )
    }
}



