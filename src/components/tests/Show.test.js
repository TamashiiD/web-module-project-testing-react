import React from 'react';
import { render, fireEvent, screen, queryByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from '@testing-library/user-event'


const testShowData = {
    name: "test",
    summary: "test summary",
    seasons: [
        {
            id: 0,
            name: "season 1",
            episodes: []
        },
        {
            id: 1,
            name: "season 1",
            episodes: []
        }
    ]

}



test('renders without errors', () => {
    render(<Show show={testShowData} selectedSeason={"none"} />)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />);
    const loading = screen.queryByTestId("loading-container")
    expect(loading).toBeInTheDocument()
});

test('renders same number of options seasons are passed in', () => {
    render(<Show show={testShowData} selectedSeason={"none"} />);
    const options = screen.queryAllByTestId("season-option")
    expect(options).toHaveLength(2)

});

// test('handleSeleLabelTextct is called when an season is selected', () => {
//     const handleSelect = jest.fn();
//     render(<Show show={testShowData} selectedSeason={"none"} handleSelect={handleSelect} />);
//     const select = screen.getByLabelText(/Select A Season/i);
//     userEvent.selectOptions(select,["1"])

//     expect(handleSelect).toBeCalled();
// });

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
  const  { rerender} = render(<Show show={testShowData} selectedSeason={"none"} />);
let episodes = screen.queryByTestId("episodes-container")
expect(episodes).not.toBeInTheDocument()

rerender(<Show show={testShowData} selectedSeason={1} />)
const episode = screen.queryByTestId('episodes-container');
expect(episode).toBeInTheDocument()

 });
