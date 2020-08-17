import React, { Component } from 'react';
import { connect } from 'react-redux';
import FixersData from '../dummyData.json';
import Header from './header';
import SubHeader from './subHeader';
import Tabs from './tabs';
import Dashboard from './dashboard';
import { englishLanguage, germanLanguage } from '../appConstant';

const setCampaignsData = payload => ({
	type: 'SET_FIXERS_DATA',
	payload,
});

const tabsData = ['upcomingCampaigns', 'liveCampaigns', 'pastCampaigns'];

class Campaigns extends Component {
	constructor(props) {
		super(props);
		this.state = {
			campaignFilterType: 'allCampaigns',
			isEnglish: true,
		};
	}

	componentDidMount() {
		const sortedCampaignsData = this.parseDummyData(FixersData);
		const { dispatch } = this.props;
		dispatch(setCampaignsData(sortedCampaignsData));
	}

	parseDummyData = fixersData => {
		const sortedData = {
			allCampaigns: fixersData.data,
			upcomingCampaigns: [],
			liveCampaigns: [],
			pastCampaigns: [],
		};
		fixersData.data.forEach(item => {
			const currentDateString = new Date();
			const currentDate = new Date().getDate();
			const currentDateMonth = new Date().getMonth();
			const currentDateYear = new Date().getFullYear();
			const campaignDateString = new Date(item.createdOn);
			const campaignDate = new Date(item.createdOn).getDate();
			const campaignDateMonth = new Date(item.createdOn).getMonth();
			const campaignDateYear = new Date(item.createdOn).getFullYear();
			if (
				campaignDateYear === currentDateYear &&
				campaignDateMonth === currentDateMonth &&
				campaignDate === currentDate
			) {
				sortedData.liveCampaigns.push(item);
			} else if (campaignDateString < currentDateString) {
				sortedData.pastCampaigns.push(item);
			} else {
				sortedData.upcomingCampaigns.push(item);
			}
		});
		return sortedData;
	};

	handleTabClick = (event, pathname, index) => {
        event.preventDefault();
		const totalNavs = document.getElementsByClassName('tab')
			.length;
		for (let count = 0; count < totalNavs; count += 1) {
			document
				.getElementsByClassName('tab')
				[count].classList.remove('active');
		}
		event.target.parentElement.classList.add('active');
		const campaignFilterType =
			tabsData[index];
		this.setState({ campaignFilterType });
	};

	handleLanguageChange = () => {
		this.setState(prevState => ({
			isEnglish: !prevState.isEnglish,
		}));
	};

	render() {
		const { campaignsReducer } = this.props;
		const { campaignFilterType, isEnglish } = this.state;
		const campaignData = campaignsReducer[campaignFilterType];
		const language = isEnglish ? englishLanguage : germanLanguage;
		return (
			<div>
				<Header headerText={language.playBigger} />
				<SubHeader
					manageFixers={language.manageFixers}
					handleLanguageChange={this.handleLanguageChange}
					isEnglish={isEnglish}
				/>
				<Tabs
					tabsData={[
						language.upcomingCampaigns,
						language.liveCampaigns,
						language.pastCampaigns,
					]}
					handleTabClick={this.handleTabClick}
				/>
				<Dashboard
					campaignsData={campaignData}
					campaignFilterType={campaignFilterType}
					language={language}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	campaignsReducer: state.campaignsReducer,
});

export default connect(mapStateToProps)(Campaigns); // NEED TO SEPARATE CONTAINER AND COMPONENT
