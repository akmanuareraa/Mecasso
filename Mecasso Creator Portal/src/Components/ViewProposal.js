import React from 'react';


function ViewProposal(props) {
    
    console.log(props.Proposal,"Proposal here")




	return (
        
		<div className = "box" >

        <div className = "column is-6 is-offset-2 has-text-centered">

          <br></br>
          <b>Proposal ID :</b><br></br> 
          {props.Proposal.ProposalID}

          <br></br>
               
          <br></br>
          <b>Heading :</b><br></br> 
          {props.Proposal.heading}

          <br></br>
          
          <br></br>
          <b>Description :</b><br></br> 
          {props.Proposal.description}

          <br></br>

          <br></br>
          <b>Creator :</b> <br></br>
          {props.Proposal.creator}

          <br></br>  
          <br></br>
          <b>Deposit :</b> <br></br>
          {props.Proposal.proposalDeposit}   

          <br></br>  
          <br></br>
          <b>Recipient :</b> <br></br>
          {props.Proposal.recipient}

          <br></br>  
          <br></br>
          <b>Amount :</b> <br></br>
          {props.Proposal.amount}

          <br></br>  
          <br></br>
          <b>Proposal passed? :</b> <br></br>
          {props.Proposal.proposalPassed? "Yes":"No"}

          <br></br>
          <br></br>
          <b>'Yes' votes :</b> <br></br>
          {props.Proposal.yea}

          <br></br>  
          <br></br>
          <b>'No' votes :</b> <br></br>
          {props.Proposal.nah}

          <br></br>  
          <br></br>
          <b>Pre-vote :</b> <br></br>
          {props.Proposal.prevote? "Yes":"No"}

 
          <br></br>  
          <br></br>
          <b>Voting Deadline :</b> <br></br>
          {props.Proposal.votingDeadline}  

          

                                                       
          <br></br><br></br>                

		<div className = "columns">        
                        
						<div className = "column ">
						<a className="button is-success is-medium" 
                        onClick={() => props.voteProposal(props.Proposal.ProposalID,true)}>
                           Vote 'Yes' 
                        </a>
                        </div> 

                        <div className = "column ">
						<a className="button is-danger is-medium"
                        onClick={() => props.voteProposal(props.Proposal.ProposalID, false)}>
                           Vote 'No'
                        </a>
                        </div>   
                              
		</div>
                            
		</div>  
		</div>
        
    )
}

export default ViewProposal;
