import React, { Component } from 'react';


class Nav extends Component {

	

    render(){

		return (
		
			<div>
			<nav className="navbar is-black"  aria-label="main navigation">
                <div className="navbar-brand">
				<div className="navbar-item " onClick={() => this.props.setNav(0)}>
        		<img src={'images/renai_logo_symbol.svg'} width="50px" length="50px"></img>
                        <h1 className="title is-renai-nav is-3">Mecasso</h1>

      			</div>
                    
				
				</div>	
		
				<div className="navbar-menu is-active">
				
				<div className="navbar-start">
				
				<a className="navbar-item " onClick={() => this.props.setNav(0)}>
        		Home
      			</a>
				
				<a className="navbar-item " onClick={() => this.props.setNav(1)}>
        		Issue token
      			</a>
				
				<a className="navbar-item " onClick={() => {
					if(this.props.navToken != '10') {
						this.props.setNav(10)
					}else{
						console.log('Already in Manage Community Page')
					}
				}}>
        		Manage Community
      			</a>

				 
				</div>

			
				{
					this.props.isWeb3?
				
					<div className="navbar-end">
				   	  
					<a className="navbar-item "> Account Connected :  {this.props.account.slice(0,5)}...</a></div>:
			
					<div className="navbar-end">
				   	  
				   <a className="navbar-item button is-renai" onClick={() => this.props.connectWallet()}>
        			Connect Metamask Wallet
      			  </a>
	
				  </div>
		}
		</div>
		</nav>	
		</div>


                )
    }
}

export default Nav;
