

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node';

import SearchBar from './searchBar'

const url = `https://api.musixmatch.com/ws/1.1/track.search?$q_artist=TestArtist`
const server = setupServer(
  http.get(url, () => {
    return HttpResponse.json(
      [
        {
          track: {
            track_id: 1,
            album_name: 'Test Album',
          },
        },
      ])
  })

);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders ArtistCard after clicking the button',  async () => {
  render(<SearchBar />);

  fireEvent.change(screen.getByLabelText('Search a Song'), { target: { value: 'q_artist' } });
  fireEvent.change(screen.getByPlaceholderText('search...'), { target: { value: 'TestArtist' } });
  fireEvent.click(screen.getByText('Get Songs'));

  waitFor(() => {
    console.log(screen.debug());
    expect(screen.getByText('Test Album')).toBeInTheDocument();
  });

});
