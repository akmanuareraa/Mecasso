import React from 'react';


function ViewAllProposals(props) {
    
    console.log("props",props.setProposalNav);
    console.log("active proposals",props.activeProposals)    



	return (
        
		<div className = "box" >

        
        <div class="tabs is-centered">
            <ul>
              
              <li><a className={props.navProposal == 1? "is-active":"is-inactive"}
                    onClick={() => props.setProposalNav(1)}>Active Proposals</a></li>
              <li><a className={props.navProposal == 2? "is-active":"is-inactive"}
                    onClick={() => props.setProposalNav(2)}>Closed Proposals</a></li>
              
            </ul>
        </div>
    

        <div className = "column has-text-centered">

        {
                    props.navProposal == 1?
    

                <table className="table">
                <thead>
                <tr>
                <th><abbr title="ProposalID">ID</abbr></th>
                <th><abbr title="Heading">Title</abbr></th>
                <th><abbr title="Creator">Creator</abbr></th>
                <th><abbr title="Recipient">Recipient</abbr></th>
                <th><abbr title="Amount">Amount</abbr></th>
                <th><abbr title="Status">Status</abbr></th>
                <th><abbr title="PreVote">PreVote</abbr></th>
                <th><abbr title="Passed">Passed</abbr></th>
                <th><abbr title="votingDeadline">Deadline</abbr></th>
                <th><abbr title="action">Action</abbr></th>             
               </tr>
               </thead>    
                    
                    {    
                    props.activeProposals.map((proposal,index) => {
                        var creator = proposal.creator.slice(0, 24);
                        var recipient = proposal.recipient.slice(0, 24);
                        //var deadline = (new Date(proposal.votingDeadline*1000)).toISOString()
                        console.log(proposal.deadline)
							
							return (
                            <tbody key={index}>
                            <tr>
                            <th>{proposal.ProposalID}</th>
                            <td>{proposal.heading}</td>
                            <td>{creator}...</td>
                            <td>{recipient}...</td>
                            <td>{proposal.amount}</td>
                            <td>{proposal.status? "Open" : "Closed"}</td>
                            <td>{proposal.prevote? "Yes" : "No"}</td>
                            <td>{proposal.passed? "Yes" : "No"}</td>
                            <td>{proposal.deadline}</td>
                            <td>                
                            <a className="button is-danger is-small  " 
                            onClick={() => props.viewactiveProposal(index)}>
                            Vote</a>    
                            </td>
                            </tr>
                            </tbody>
                              
                            )
                            })
                    }
                </table>:    

                <table className="table">
                <thead>
                <tr>
                <th><abbr title="ProposalID">ID</abbr></th>
                <th><abbr title="Heading">Title</abbr></th>
                <th><abbr title="Creator">Creator</abbr></th>
                <th><abbr title="Recipient">Recipient</abbr></th>
                <th><abbr title="Amount">Amount</abbr></th>
                <th><abbr title="Status">Status</abbr></th>
                <th><abbr title="PreVote">PreVote</abbr></th>
                <th><abbr title="Passed">Passed</abbr></th>
                <th><abbr title="votingDeadline">Deadline</abbr></th>
                <th><abbr title="action">Action</abbr></th>             
               </tr>
               </thead>
                                             

                    {    
                    props.closedProposals.map((proposal,index) => {
                        var creator = proposal.creator.slice(0, 8);
                        var recipient = proposal.recipient.slice(0, 8);
                        return (
                            <tbody key={index}>
                            <tr>
                            <th>{proposal.ProposalID}</th>
                            <td>{proposal.heading}</td>
                            <td>{creator}...</td>
                            <td>{recipient}...</td>
                            <td>{proposal.amount}</td>
                            <td>{proposal.status? "Open" : "Closed"}</td>
                            <td>{proposal.prevote? "Yes" : "No"}</td>
                            <td>{proposal.passed? "Yes" : "No"}</td>
                            <td>{proposal.votingDeadline}</td>
                            <td>                                
                            <a className="button is-danger is-small  " 
                            onClick={() => props.viewclosedProposal(index)}>
                            Vote</a>    
                            </td>
                            </tr>
                            </tbody>
                              
                            )
                            })
                    }
                </table>    
                            
                
                }

          
                           
		</div>  
		</div>
        
    )
}

export default ViewAllProposals;
