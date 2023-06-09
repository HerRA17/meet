import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from "../MockData";
import { extractLocations, getEvents } from '../api';


describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });

    test ('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    test('render number of events', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    })
});

describe ('<App /> integration', () => {
    test('App passes "events" state as a prop to Eventlist', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });

    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });

    test('get list of events matching city selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations});
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        const shownEvents = eventsToShow.slice(0,32);
        expect(AppWrapper.state('events')).toEqual(shownEvents);
        AppWrapper.unmount();
    });

    test('get list of all events when user selects "See all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionsItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionsItems.at(suggestionsItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        const shownEvents = allEvents.slice(0,32);
        expect(AppWrapper.state('events')).toEqual(shownEvents);
        AppWrapper.unmount();
    });

    test('App passes the default "eventNumberResult" state as a prop to NumberOfEvents' , () => {
        const AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        expect(NumberOfEventsWrapper.prop('eventNumberResult')).toEqual(AppWrapper.state('eventNumberResult'))
        AppWrapper.unmount();
    });
    
    test('when events state changes number of events changes', () => {
        const AppWrapper = mount(<App />);
        const eventNumberResult = AppWrapper.state('eventNumberResult');
        expect(eventNumberResult).toEqual(AppWrapper.find(NumberOfEvents).props().eventNumberResult);
        AppWrapper.unmount();
    });    

    test('get lits of events matching the number of events selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        const selectedNumber = Math.floor(Math.random() * mockData.length);
        const event = {target: { value: selectedNumber } };
        await NumberOfEventsWrapper.find('input', 'num').simulate('change', event);
        expect(AppWrapper.state('eventNumberResult')).toEqual(selectedNumber);
        expect(AppWrapper.state('eventNumberResult')).toEqual(selectedNumber);
        AppWrapper.unmount();
    });    

});