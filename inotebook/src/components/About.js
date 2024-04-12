import React from 'react'
import Redux from './Redux/Redux'

const About = () => { 
    return (
        <div>
           <main id="main">

{/* <!-- ======= About Us Section ======= --> */}
<section id="about" className="about">
  {/* <div className="container aos-init aos-animate" data-aos="fade-up"> */}
  <div>
    <div className="section-title">
      <h2>About Us</h2>
    </div>
      <div className="content" style={{textAlign:'center'}}>
        <p >
          Welcome to our note-taking website, where you can easily create, read, update, and delete notes. Our
          user-friendly interface makes it simple to organize and manage your notes. We take security and privacy
          seriously, your notes are always kept safe with advanced encryption techniques. If you have any questions
          or concerns, please don't hesitate to contact us.
        </p>
        {/* <a href="#" className="btn-learn-">Learn More</a> */}
      </div>
      
      <div className="points">
        <ul>
          <li><i className="ri-check-double-line"></i> Safe and Accessible: Store notes securely and access them from any device with an internet connection.</li>
          <li><i className="ri-check-double-line"></i> Organized Notes: Keep notes organized with folders, tags, and categories, and easily search for specific information.</li>
          <li><i className="ri-check-double-line"></i> Advanced Encryption: iNotebook uses advanced encryption techniques to protect sensitive information both in transit and at rest.</li>
        </ul>
        {/* <!-- <a href="#" className="btn-learn-more">Learn More</a> --> */}
      </div>
    </div>

 
</section>
{/* <!-- End About Us Section --> */}

{/* <!-- ======= Skills Section ======= --> */}
<br></br>
<section id="pics" className="pics" style={{display:"flex",alignItems:'center',justifyContent:"center"}}>
      <div className="col-lg-6 d-flex align-items-center justify-content-center aos-init aos-animate" data-aos="fade-right" data-aos-delay="100">
        <img src="https://i-notebook-app-website-download.vercel.app/assets/img/leftIMG.png" style={{maxWidth: "45%"}} className="img-fluid" alt=""/>
      </div>
      <div className="col-lg-6 d-flex align-items-center justify-content-center aos-init aos-animate" data-aos="fade-left" data-aos-delay="100">
        <img src="https://i-notebook-app-website-download.vercel.app/assets/img/rightIMG.png" style={{maxWidth: "45%"}} className="img-fluid" alt=""/>
      </div>
    
</section>
{/* <!-- End Skills Section --> */}



</main>
        </div>
    )
}

export default About
