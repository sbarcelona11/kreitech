import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import sinon from 'sinon';

import App from '../components/App';
import Profile from '../components/Profile/Profile';
import Gallery from '../components/Gallery/Gallery';
import Spotify from '../lib/spotify';

import beatlesData from './fixtures/beatles.js';
import mockFetch from './helpers/mockFetch';
import mockResponse from './helpers/mockResponses';

describe('App', () => {
    let wrapper;

    const auth = "BQBxO1G5GLpAkHtLjUl-Q39iApJtSUWV8hRj3_WjaWy_OuawD8i_NTMqCTv5w5utdYBFhyeC7PRd444hsKRgh5JbAkT-cTB_Wxh9yfzIRYDDJJCxJzOHB5wQ93GmA4uPHqid6D5s3Ubh1T-2v4kskynOPTZzF61cZQ";

    afterAll(() => {
        mockFetch.restore();
    });

    beforeEach(() => {
        wrapper = mount(<App/>);
        wrapper.setState({token: auth});
    });

    afterEach(() => {
        // cleanup on exiting
        mockFetch.restore();
    });

    it('renders app component and have button', () => {
        wrapper.setState({token: ''});
        const button = wrapper.find('.btn');

        expect(button.text()).to.equal('Login to Spotify');
    });

    it('renders app component and click button', () => {
        wrapper.setState({token: ''});
        const mockCallBack = sinon.spy();

        const button = wrapper.find(".btn");
        button.simulate('click', {button: 0});

        expect(button).length(1);
        expect(mockCallBack.called).equal(false);
    });

    it('has state: query, with initial value: ""', () => {
        wrapper.setState({query: ''});
        expect(wrapper.state().query).to.equal("");
    });

    it('has state: artist, with initial value: null', () => {
        wrapper.setState({artist: null});
        expect(wrapper.state().artist).to.equal(null);
    });

    describe('behavior', () => {
        let wrapper, search;

        beforeEach(() => {
            wrapper = mount(<App/>);
            wrapper.setState({token: auth});
        });

        it('clicking the search button calls the search() function on Spotify API', () => {
            search = sinon.spy(Spotify, 'search');

            wrapper.find('form').simulate('submit');
            sinon.assert.calledOnce(search);

            search.restore();
        });

        describe('API interaction', () => {
            let beatles;

            beforeEach(() => {
                mockResponse.beatlesSearch();
                wrapper.setState({query: 'The Beatles'});
                beatles = beatlesData.artists.items[0];
            });

            it('search() gets artist data from the spotify API', async () => {
                const response = await wrapper.find("Search").instance().handleSearch();
                expect(response.artists.items[0]).to.equal(beatles);
            });

            it('searching for an artist renders the profile for that Artist', async () => {
                let response = await wrapper.find("Search").instance().handleSearch();
                expect(wrapper.find(Profile).instance().props.artists).to.eql([beatles]);
            });

        });

        describe('Error handling', () => {

            beforeEach(() => {
                wrapper = mount(<App/>);
                wrapper.setState({token: auth});
            });

            beforeEach(() => {
                mockResponse.emptySearch();
            });

            it('displays an error message on empty search', async () => {
                const response = await wrapper.find("Search").instance().handleSearch();
                expect(wrapper.find('.error').text()).to.equal('Please enter a search query');
            });

            it('clears the error when a successful search is completed', async () => {
                await wrapper.find("Search").instance().handleSearch();
                mockResponse.beatlesSearch();
                await wrapper.find("Search").instance().handleSearch();
                expect(wrapper.find('.error').text()).to.equal('');
            });

            it('displays an artist not found message upon unsuccessful search', async () => {
                mockResponse.artistNotFound();
                await wrapper.find("Search").instance().handleSearch();
                expect(wrapper.find('.error').text()).to.equal('Artist not found, please try again');
            });

            it('clears artist not found message upon successful search', async () => {
                mockResponse.artistNotFound();
                await wrapper.find("Search").instance().handleSearch();
                mockResponse.beatlesSearch();
                await wrapper.find("Search").instance().handleSearch();
                expect(wrapper.find('.error').text()).to.equal('');
            });

        });
    });
});