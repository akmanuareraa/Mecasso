import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import InstallMetamask from './InstallMetamask';
import SendSocTok from "./SendSocTok";
import Web3 from 'web3';
import DonutChartCreator from './DonutChartCreator';

function ManageDAO(props) {
    console.log('props passed mdao', props)

    console.log("brief proposals ManageDAO", props.briefProposals)
    //console.log("DAOlist",props.DAOlist,"length",props.DAOlist.length)
    console.log(props.profilePhoto, "profilePhoto");
    if (props.isWeb3 && props.DAOlist.length == 0) {
        console.log("Reached here DAOList");
        props.setDAOlist()
    }


    return (


        <div className="bg-box">
            <br></br><br></br>

            {
                props.DAOcontract && props.cap ?
                    <div>
                        <div className="is-hidden-mobile">
                            <div className="column is-8 is-offset-1">

                                <h1 className="title is-1 is-renai-invert">Manage Community</h1>

                                <br></br>

                                <div className="columns is-centered ">

                                    <div className="column is-offset-1">
                                        <a className="button  is-renai "
                                            onClick={() => props.setNav(11)}>
                                            Increase Max Token Cap</a>
                                    </div>

                                    <div className="column">
                                        <a className="button  is-renai  "
                                            onClick={() => props.setNav(12)}>
                                            Mint Community NFT</a>
                                    </div>

                                    <div className="column">
                                        <a className="button  is-renai  "
                                            onClick={() => props.setNav(13)}>
                                            Donate to Social Cause</a>
                                    </div>

                                    <div className="column">
                                        <a className="button  is-renai  "
                                            onClick={() => props.setNav(14)}>
                                            Create Other Proposal</a>
                                    </div>
                                    <br></br><br></br>
                                </div>
                            </div>

                            <div className="column is-6 is-offset-2">
                                <div className="columns is-centered">

                                    <div className="column is-offset-3">
                                        <a className="button is-renai is-secondary  "
                                            onClick={() => props.setNav(19)}>
                                            Post News and Updates</a>
                                    </div>

                                    <div className="column">
                                        <a className="button is-renai is-secondary " disabled
                                            onClick={() => props.setNav(20)}>
                                            Manage Rewards</a>
                                    </div>
                                </div>
                            </div>
                            <br></br><br></br>
                            <div className="column is-offset-4">
                                <h1>Distribution Chart</h1>
                                <DonutChartCreator
                                    totalSupply={props.totalSupply}
                                    balance={props.balance}
                                />
                            </div>
                            <br></br><br></br>
                            <br></br><br></br>
                            <div className="column is-8 is-offset-1">

                                <div className="columns">

                                    <div className="column is-7">

                                        <h1 class="title is-3 is-renai-invert">Token Distribution</h1>
                                        <br></br>

                                        <div className="column is-offset-1">
                                            <h4 class="title is-6 is-renai-invert">Maximum Cap</h4>
                                            <span class="tag is-light is-medium">{props.cap} &nbsp; {props.tokensymbol}</span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>



                                        <div className="column is-offset-1">
                                            <h4 class="title is-6 is-renai-invert">Current Circulation</h4>
                                            <span class="tag is-light is-medium">{props.totalSupply} &nbsp; {props.tokensymbol}</span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>




                                        <div className="column is-offset-1">
                                            <h4 class="title is-6 is-renai-invert">User's Balance</h4>
                                            <span class="tag is-light is-medium">{Web3.utils.fromWei(props.balance.toString())} &nbsp; {props.tokensymbol}</span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <a className="button is-renai"
                                                onClick={() => props.setNav(17)}>
                                                Send {props.tokensymbol}</a>

                                        </div>


                                        <div className="column is-offset-1">
                                            <h4 class="title is-6 is-renai-invert">Charm Balance</h4>
                                            <span class="tag is-light is-medium">{props.charmBalance} &nbsp; CHRM</span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>



                                    </div>



                                    <div className="column is-7 has-text-centered">
                                        <h1 class="title is-3 is-renai-invert">Latest Proposals</h1>
                                        <div className="column is-offset-1 has-text-centered">
                                            <div className="box bg-box renaipanel" >
                                                <table className="table is-bordered is-striped is-hoverable is-fullwidth">
                                                    <thead>
                                                        <tr>
                                                            <th><abbr title="ProposalID">ID</abbr></th>
                                                            <th><abbr title="Heading">Title</abbr></th>
                                                            <th><abbr title="Status">Status</abbr></th>
                                                            <th><abbr title="votingDeadline">Deadline</abbr></th>
                                                            <th><abbr title="action">Action</abbr></th>
                                                        </tr>
                                                    </thead>

                                                    {
                                                        props.briefProposals.map((proposal, index) => {


                                                            return (
                                                                <tbody key={index}>
                                                                    <tr>
                                                                        <th>{proposal.proposalID}</th>
                                                                        <td>{proposal.heading}</td>
                                                                        <td>{proposal.status ? "Open" : "Closed"}</td>
                                                                        <td>{proposal.deadline}</td>
                                                                        <td>
                                                                            <a className="button is-renai is-small  "
                                                                                onClick={() => props.viewactiveProposal(index)}>
                                                                                Vote</a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>

                                                            )
                                                        })
                                                    }

                                                </table>
                                            </div>
                                        </div>
                                        <div className="column has-text-centered is-offset-1">
                                            <a className="button is-renai is-small  "
                                                onClick={() => props.setNav(18)}>
                                                View all Proposals</a>
                                        </div>
                                        <br></br>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="is-hidden-desktop">
                            <div className="column has-text-centered">

                                <h1 className="title is-3 is-renai-invert">Manage Community</h1>

                                <br></br>

                                <div className="columns is-centered ">

                                    <div className="column has-text-centered">
                                        <p className="control has-text-centered">
                                            <a className="button  is-renai "
                                                onClick={() => props.setNav(11)}>
                                                Increase Max Token Cap</a>
                                        </p>
                                    </div>

                                    <div className="column has-text-centered">
                                        <p className="control has-text-centered">
                                            <a className="button  is-renai  "
                                                onClick={() => props.setNav(12)}>
                                                Mint Community NFT</a>
                                        </p>
                                    </div>

                                    <div className="column has-text-centered">
                                        <p className="control has-text-centered">
                                            <a className="button  is-renai  "
                                                onClick={() => props.setNav(13)}>
                                                Donate to Social Cause</a>
                                        </p>
                                    </div>

                                    <div className="column has-text-centered">
                                        <p className="control has-text-centered">
                                            <a className="button  is-renai  "
                                                onClick={() => props.setNav(14)}>
                                                Create Other Proposal</a>
                                        </p>
                                    </div>
                                    <br></br><br></br>
                                </div>
                            </div>

                            <div className="column">
                                <div className="columns is-centered">

                                    <div className="column">
                                        <p className="control has-text-centered">
                                            <a className="button is-renai is-secondary  "
                                                onClick={() => props.setNav(19)}>
                                                Post News and Updates</a>
                                        </p>
                                    </div>

                                    <div className="column">
                                        <p className="control has-text-centered">
                                            <a className="button is-renai is-secondary " disabled
                                                onClick={() => props.setNav(20)}>
                                                Manage Rewards</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <br></br><br></br>
                            <div className="column is-offset-1 has-text-centered">

                                <p className="control has-text-centered is-inline-block">
                                    <DonutChartCreator
                                        balance={props.balance}
                                        totalSupply={props.totalSupply}
                                    />
                                </p>

                            </div>
                            <br></br><br></br>
                            <br></br><br></br>
                            <div className="column is-8 is-offset-1">

                                <div className="columns is-centered">

                                    <div className="column has-text-centered">

                                        <h1 class="title is-3 is-renai-invert">Token Distribution</h1>
                                        <br></br>

                                        <div className="column has-text-centered">
                                            <h4 class="title is-6 is-renai-invert">Maximum Cap</h4>
                                            <span class="tag is-light is-medium">{props.cap} &nbsp; {props.tokensymbol}</span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>



                                        <div className="column has-text-centered">
                                            <h4 class="title is-6 is-renai-invert">Current Circulation</h4>
                                            <span class="tag is-light is-medium">{props.totalSupply} &nbsp; {props.tokensymbol}</span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>




                                        <div className="column has-text-centered">
                                            <h4 class="title is-6 is-renai-invert">User's Balance</h4>
                                            <span class="tag is-light is-medium">{Web3.utils.fromWei(props.balance.toString())} &nbsp; {props.tokensymbol}</span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <a className="button is-renai"
                                                onClick={() => props.setNav(17)}>
                                                Send {props.tokensymbol}</a>

                                        </div>


                                        <div className="column has-text-centered">
                                            <h4 class="title is-6 is-renai-invert">Charm Balance</h4>
                                            <span class="tag is-light is-medium">{props.charmBalance} &nbsp; CHRM</span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>



                                    </div>



                                    <div className="column is-7 has-text-centered">
                                        <h1 class="title is-3 is-renai-invert">Latest Proposals</h1>
                                        <div className="column is-offset-1 has-text-centered">
                                            <div className="box bg-box renaipanel" >
                                                <table className="table is-bordered is-striped is-hoverable is-fullwidth">
                                                    <thead>
                                                        <tr>
                                                            <th><abbr title="ProposalID">ID</abbr></th>
                                                            <th><abbr title="Heading">Title</abbr></th>
                                                            <th><abbr title="Status">Status</abbr></th>
                                                            <th><abbr title="votingDeadline">Deadline</abbr></th>
                                                            <th><abbr title="action">Action</abbr></th>
                                                        </tr>
                                                    </thead>

                                                    {
                                                        props.briefProposals.map((proposal, index) => {


                                                            return (
                                                                <tbody key={index}>
                                                                    <tr>
                                                                        <th>{proposal.proposalID}</th>
                                                                        <td>{proposal.heading}</td>
                                                                        <td>{proposal.status ? "Open" : "Closed"}</td>
                                                                        <td>{proposal.deadline}</td>
                                                                        <td>
                                                                            <a className="button is-renai is-small  "
                                                                                onClick={() => props.viewactiveProposal(index)}>
                                                                                Vote</a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>

                                                            )
                                                        })
                                                    }

                                                </table>
                                            </div>
                                        </div>
                                        <div className="column has-text-centered is-offset-1">
                                            <a className="button is-renai is-small  "
                                                onClick={() => props.setNav(18)}>
                                                View all Proposals</a>
                                        </div>
                                        <br></br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :


                    !props.isWeb3 ?
                        <div className="bg-box" style={{}}>
                            <br></br><br></br><br></br><br></br><br></br><br></br>
                            <div className="column">
                                <InstallMetamask connectWC={props.connectWC} />
                                <br></br><br></br><br></br><br></br><br></br>
                            </div>
                        </div> :

                        <div className="column is-6 is-offset-2">



                            <h5 class="title is-5 is-renai-invert">
                                Select a Community
                            </h5>
                            <br></br>
                            <div className="columns is-multiline is-centered">
                                {
                                    props.DAOlist.map((dao, index) => {


                                        return (
                                            <div className="column is-7 has-text-centered" key={index}>
                                                <div class="card has-text-centered">
                                                    <div className="bg-box renaipanel has-text-centered" >
                                                        <div class="card-content">
                                                            <div class="media">
                                                                <div class="media-left">
                                                                    <figure class="image is-128x128 is-round">
                                                                        <img src={props.profilePhoto} alt="Placeholder image"></img>
                                                                    </figure>
                                                                </div>
                                                                <div class="media-right">
                                                                    Token Name:
                                                                    <div class="title is-4">{dao.tokenName}</div>
                                                                    Token Symbol:
                                                                    <div class="title is-5">{dao.tokenSymbol}</div>

                                                                </div>

                                                            </div>

                                                            <div class="content">
                                                                Contract:
                                                                <div>
                                                                    <span class="tag is-light"  >{dao.contractAddress.slice(0, 30)}...</span>
                                                                </div>
                                                                <br></br>
                                                                <a className="button is-renai"
                                                                    onClick={() => props.setDAO(dao.tokenName, dao.contractAddress)}>
                                                                    View Community
                                                                </a>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <br></br>
                            <div className="column has-text-centered">
                                <h3 class="title is-3 is-renai-invert">
                                    --OR--
                                </h3>
                            </div>
                            <br></br><br></br>


                            <h5 class="title is-5 is-renai-invert">
                                Enter Community DAO contract address
                            </h5>

                            <div className="column has-text-centered">
                                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                                    fields={props.fields} name="daocontract" placeholder="0x0000000000000000000000000000000000000" />
                                <br></br><br></br>

                                <a className="button is-renai" onClick={() => props.setDAO(props.state.fields.daocontract)}>
                                    Load DAO Contract
                                </a>
                            </div>
                            <br></br><br></br>
                            <br></br><br></br>
                            <br></br><br></br>
                            <br></br><br></br>
                            <br></br><br></br>
                            <br></br><br></br>
                            <br></br><br></br>
                            <br></br><br></br>
                            <br></br><br></br>
                        </div>

            }

        </div>


    )

}




export default ManageDAO;
