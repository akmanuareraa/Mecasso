import React from 'react';
import background from "../img/background.png";





function SocialCard(props) {
    

    console.log(props.socialIDs.Youtube,"socialIDs");
    console.log(props,"socialNav");
   
    var tempDate = props.socialIDs.Youtube.createdOn;
    var createdOn = tempDate.split("T",1);
	
	return (
        
		<div className = "box bg-img" >
        <div className = "is-hidden-mobile">
        <div className = "columns has-text-centered">
        <div className = "column is-4 is-offset-4 ">
			<nav className="panel">
            <p class="panel-heading">
                <h1 className="title is-4">Social Card</h1>
            </p>
            
            <p class="panel-tabs">
                
                <figure className="image is-social is-icon" >
  				<img src={'icons/youtube.png'}/> 
				</figure>
                
            </p>
          	
		    </nav>	
		</div>
        </div>

        <div className = "column is-6 is-offset-3">
        {
            props.socialNav == 1?

            

            <div>
       
            {
        
        props.socialIDs.Youtube?
  
        <div className="box bg-box renaipanel" >
           <br></br>    
          
          <div className = "column is-10 ">
          <div className = "columns is-centered is-vcentered">
              
          <div className ="column is-2 has-text-centered is-offset-1">
          
          <figure className="image is-round is-128x128"> 
            <img  src={props.socialIDs.Youtube.thumbnail.url}/>
          </figure>    
          
          </div>

          <div className ="column has-text-centered is-offset-3">
      
          Channel Name:
          <br></br>
          <a href={props.socialIDs.Youtube.url}>
          <h3 class="title is-3">  
          {props.socialIDs.Youtube.channelName}
          </h3>
          </a>
          </div> 
          </div>
          </div>
          
          <br></br>

          <div className = "column is-10 ">

          <div className = "columns is-centered is-vcentered">
              
          

          <div className ="column has-text-centered is-offset-2">
          <div>
          <h4 className="title is-4">{props.socialIDs.Youtube.subscribers}</h4> 
          </div>
          <div className="is-socialTag is-socialMem">
              Subscribers
          </div> 
          </div>

          <div className ="column has-text-centered is-offset-1">
          <div>
          <h4 className="title is-4">{props.socialIDs.Youtube.mediaCount}</h4> 
          </div>
          <div className="is-socialTag is-socialMem">
              Videos
          </div> 
          </div>

          <div className ="column has-text-centered is-offset-1">
          <div>      
          <h4 className="title is-4">{props.socialIDs.Youtube.views}</h4> 
          </div>
          <div className="is-socialTag is-socialMem">
              Views
          </div>
          </div>

          </div>
          </div>
          
          <br></br>
          
          
          <div className ="column is-10 is-offset-1 has-text-centered ">
          <b>Channel Description :</b> <br></br>
          { 
          props.socialIDs.Youtube.description?
          <div>{props.socialIDs.Youtube.description}</div>:
          <div>Not Available</div>
          }
          </div>
          

          <div className ="column is-6 is-offset-3 has-text-centered ">
              
          {
              props.socialIDs.Youtube.categories[0] != "Not Defined"?
              <div className = "columns is-centered is-vcentered is-multiline">
              {
              props.socialIDs.Youtube.categories.map((category,index) => {

            var categoryShort = category.split("https://en.wikipedia.org/wiki/",2);
              
                return (
                    <div key={index} className = "column has-text-centered"> 
                    <div className="is-socialTag is-socialMemBlack">
                     {categoryShort}
                   </div>
                   </div>  
                )
              })
             }
             </div>:
             <div></div>
         }
         
         <b>Created on :</b> <br></br>
          {createdOn}
         </div>
         </div>:
         <div className="column has-text-centered">
              Social ID not set
          </div>
         
            }
         </div>:
        <div className="box is-light">
       
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>  
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>    

        </div>
      } 
        </div>

        <div className = "column is-4 is-offset-4 has-text-centered">
                                                       
                        
						<a className="button is-renai is-medium" 
                            onClick={() => props.setNav('1b')}>
                           Create Community Token 
                        </a>
        </div>   
                              
    
        </div>
        <div className = "is-hidden-desktop">
            <div className = "columns has-text-centered">
            <div className = "column is-4 is-offset-4 ">
                <nav className="panel">
                <p class="panel-heading">
                    <h1 className="title is-4">Social Card</h1>
                </p>
                
                <p class="panel-tabs">
                    
                    <figure className="image is-social is-icon" >
                      <img src={'icons/youtube.png'}/> 
                    </figure>
                    
                </p>
                  
                </nav>	
            </div>
            </div>
    
            <div className = "column is-6 is-offset-3">
            {
                props.socialNav == 1?
    
                
    
                <div>
           
                {
            
            props.socialIDs.Youtube?
      
            <div className="box bg-box renaipanel" >
               <br></br>    
              
              <div className = "column is-10 ">
              <div className = "columns is-centered is-vcentered">
                  
              <div className ="column is-offset-3 has-text-centered ">
              
              <figure className="image is-round is-inline-block has-text-centered" > 
                <img  src={props.socialIDs.Youtube.thumbnail.url}/>
              </figure>    
              
              </div>
              <br></br>
              <div className ="column has-text-centered is-offset-3">
          
              Channel Name:
              <br></br>
              <a href={props.socialIDs.Youtube.url}>
              <h3 class="title is-3">  
              {props.socialIDs.Youtube.channelName}
              </h3>
              </a>
              </div> 
              </div>
              </div>
              
              <br></br>
    
              <div className = "column is-10 ">
    
              <div className = "columns is-centered is-vcentered">
                  
              
    
              <div className ="column has-text-centered">
              <div>
              <h4 className="title is-4">{props.socialIDs.Youtube.subscribers}</h4> 
              </div>
	      		
              <div className="is-socialTag is-socialMem is-inline-block">
                  Subscribers
                 
              </div> 
              </div>
              
    
              <div className ="column has-text-centered">
              <div>
              <h4 className="title is-4">{props.socialIDs.Youtube.mediaCount}</h4> 
              </div>
              
              <div className="is-socialTag is-socialMem is-inline-block">
                  Videos
               
              </div>
            </div>
    
              <div className ="column has-text-centered">
              <div>      
              <h4 className="title is-4">{props.socialIDs.Youtube.views}</h4> 
              </div>
              
              <div className="is-socialTag is-socialMem is-inline-block">
                  Views
              </div>
              
              </div>

              </div>
              </div>
              
              <br></br>
              
              
              <div className ="column is-10 is-offset-1 has-text-centered ">
              <b>Channel Description :</b> <br></br>
              { 
              props.socialIDs.Youtube.description?
              
              <div>{props.socialIDs.Youtube.description}</div>:
              <div>Not Available</div>
              }
              </div>
              
    
              <div className ="column is-6 has-text-centered ">
                  
              {
                  props.socialIDs.Youtube.categories[0] != "Not Defined"?
                  <div className = "columns is-centered is-vcentered is-multiline">
                  {
                  props.socialIDs.Youtube.categories.map((category,index) => {
    
                var categoryShort = category.split("https://en.wikipedia.org/wiki/",2);
                  
                    return (
                        <div key={index} className = "column has-text-centered"> 
                        
                        <div className="is-socialTag is-socialMemBlack is-inline-block">
                         {categoryShort}
                       
                       </div>
                       </div>  
                    )
                  })
                 }
                 </div>:
                 <div></div>
             }
             
             <b>Created on :</b> <br></br>
              {createdOn}
             </div>
             </div>:
             <div className="column has-text-centered">
                  Social ID not set
              </div>
             
                }
             </div>:
            <div className="box is-light">
           
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>  
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>    
    
            </div>
          } 
            </div>
    
            <div className = "column is-4 is-offset-4 has-text-centered">
                                                           
                            
                            <a className="button is-renai is-medium" 
                                onClick={() => props.setNav('1b')}>
                               Create Community Token 
                            </a>
            </div>   
                                  
        
            </div>
         
        
    
    
    </div>    
        
    )
}

export default SocialCard;
