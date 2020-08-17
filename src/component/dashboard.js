import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PricingModal from './pricingModal';

const updateCampaignsData = payload => ({
	type: 'UPDATE_FIXERS_DATA',
	payload,
});

const monthNames = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			calendarVisible: false,
			date: new Date(),
			showModal: false,
			modalContent: null,
		};
	}

	handleCalendarClick = event => {
		const { calendarVisible } = this.state;
		const calendarPositionTop =
			window.scrollY +
			event.target.getBoundingClientRect().top +
			event.target.offsetHeight;
		let currentElement = event.target.parentElement;
		let currentCampaignRow = null;
		let currentCampaignName = '';
		while (!currentElement.classList.contains('c-row')) {
			currentElement = currentElement.parentElement;
		}
		currentCampaignRow = currentElement;
		currentCampaignName = currentCampaignRow.querySelectorAll(
			'.c-info p'
		)[0].innerHTML;
		this.setState(
			prev => ({
				calendarVisible: !calendarVisible,
				currentCampaignRow,
				currentCampaignName,
			}),
			() => {
				if (
					document.getElementsByClassName('react-calendar').length !==
					0
				) {
					document.getElementsByClassName(
						'react-calendar'
					)[0].style.top = `${calendarPositionTop}px`;
				}
			}
		);
	};

	onCalendarValueChange = value => {
		this.setState({
			calendarVisible: false,
		});
		let currentCampaignGroup = '';
		let shiftedToCampaignGroup = '';
		const updatedDate = new Date(value);
		const currentDate = new Date();
		const { currentCampaignName } = this.state;
		const { currentCampaignRow } = this.state;
		const currentCampaignYear = currentCampaignRow.querySelectorAll(
			'.c-date p span'
		)[1].innerHTML;
		const currentCampaignMonth =
			monthNames.indexOf(
				currentCampaignRow.querySelectorAll('.c-date p span')[0]
					.innerHTML
			) + 1;
		const currentCampaignDay = currentCampaignRow.querySelectorAll(
			'.c-date p span'
		)[2].innerHTML;
		const currentCampaignDate = new Date(
			`${currentCampaignYear}/${currentCampaignMonth}/${currentCampaignDay}`
		);

		currentCampaignGroup = this.getCampaign(
			currentCampaignDate,
			currentDate
		);
		shiftedToCampaignGroup = this.getCampaign(updatedDate, currentDate);

		const updatedDataObject = {
			currentCampaignGroup,
			currentCampaignName,
			updatedDate: updatedDate.getTime(),
			shiftedToCampaignGroup,
		};
		if (currentCampaignDate.getTime() !== updatedDate.getTime()) {
			const { dispatch } = this.props;
			dispatch(updateCampaignsData(updatedDataObject));
		}
	};

	getCampaign = (date, currentDate) => {
		let campaignGroup = '';
		if (
			date.getFullYear() === currentDate.getFullYear() &&
			date.getMonth() === currentDate.getMonth() &&
			date.getDate() === currentDate.getDate()
		) {
			campaignGroup = 'liveCampaigns';
		} else if (date < currentDate) {
			campaignGroup = 'pastCampaigns';
		} else {
			campaignGroup = 'upcomingCampaigns';
		}
		return campaignGroup;
	};

	handleModalClick = (event, item) => {
		this.setState({
			showModal: true,
			modalContent: item,
		});
	};

	handleCloseBtnClick = () => {
		this.setState({
			showModal: false,
		});
	};

	render() {
		const { language, campaignsData } = this.props;
		const { date, modalContent, showModal, calendarVisible } = this.state;
		return (
			<div>
				<table className="fixers-data">
					<thead>
						<tr>
							<th className="c-date">{language.date}</th>
							<th className="c-detail">
								{language.campaign}
							</th>
							<th className="view-fixers-pricing">
								{language.view}
							</th>
							<th className="c-act">
								{language.actions}
							</th>
						</tr>
					</thead>
					<tbody>
						{campaignsData.map(item => {
							const currentDate = new Date();
							const campaignDate = new Date(item.createdOn);
							let gapDays = '';
							let campaignDateString = '';
							if (
								campaignDate.getFullYear() ===
									currentDate.getFullYear() &&
								campaignDate.getMonth() ===
									currentDate.getMonth() &&
								campaignDate.getDate() === currentDate.getDate()
							) {
								campaignDateString = 'Present Day';
							} else if (campaignDate < currentDate) {
								gapDays =
									(currentDate.getTime() -
										campaignDate.getTime()) /
									(24 * 60 * 60 * 1000);
								gapDays = Math.round(gapDays);
								campaignDateString = `${gapDays} ${
									language.daysAgo
								}`;
							} else {
								gapDays =
									(campaignDate.getTime() -
										currentDate.getTime()) /
									(24 * 60 * 60 * 1000);
								gapDays = Math.round(gapDays);
								campaignDateString = `${gapDays} ${
									language.daysAhead
								}`;
							}
							return (
								<tr key={item.name} className="c-row">
									<td className="c-date">
										<p>
											<span>
												{
													monthNames[
														campaignDate.getMonth()
													]
												}
											</span>{' '}
											<span>
												{campaignDate.getFullYear()}
											</span>
											,{' '}
											<span>
												{campaignDate.getDate()}
											</span>
										</p>
										<p className="days-ago">{campaignDateString}</p>
									</td>
									<td className="c-detail">
										<div className="c-img">
											<i
												className={item.image_url}
											/>
										</div>
										<div className="c-info">
											<p>{item.name}</p>
											<p className="days-ago">{item.region}</p>
										</div>
									</td>
									<td className="view-fixers-pricing">
										<div
											className="view-pricing"
											onClick={event =>
												this.handleModalClick(
													event,
													item
												)
											}
										>
											<span className="view-pricing-icon">
												<i />
											</span>
											<span className="view-pricing-text">
												{language.viewPricing}
											</span>
										</div>
									</td>
									<td className="c-act">
										<div className="csv">
											<a href={item.csv}>
												<i />
												CSV
											</a>
										</div>
										<div className="report">
											<a href={item.report}>
												<i />
												{language.report}
											</a>
										</div>
										<div
											className="schedule-agn"
											onClick={this.handleCalendarClick}
										>
											<i />
											<span>{language.scheduleAgain}</span>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				{calendarVisible ? (
					<Calendar
						onChange={this.onCalendarValueChange}
						value={date}
					/>
				) : null}

				{showModal ? (
					<PricingModal
						modalContent={modalContent}
						language={language}
						handleCloseBtnClick={this.handleCloseBtnClick}
					/>
				) : null}
			</div>
		);
	}
}

export default connect(
	null,
	null
)(Dashboard); // NEED TO SEPARATE CONTAINER AND COMPONENT
