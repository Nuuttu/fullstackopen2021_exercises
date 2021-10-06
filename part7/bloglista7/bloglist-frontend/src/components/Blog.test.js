import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> renders only title and view-button', () => {
  test('renders content of title and not others', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'TTJ',
      url: 'loglgolg',
      user: {
        username: 'lolo',
        name: 'koko',
      }
    }
    const component = render(
      <Blog blog={blog} />
    )
    /*
    console.log(prettyDOM(div))

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )

    const element = component.getByText(
      'Component testing is done with react-testing-library'
    )
    expect(element).toBeDefined()
  */
    const div = component.container.querySelector('.blogSpace')
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    expect(div).not.toHaveTextContent('TTJ')
    expect(div).not.toHaveTextContent('loglgolg')

  })

  test('clicking the like button calls event handler once', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'TTJ',
      url: 'logl',
      user: {
        username: 'lolo',
        name: 'koko',
      }
    }

    // eslint-disable-next-line no-undef
    const addLike = jest.fn()

    const component = render(
      <Blog blog={blog} addLike={addLike} user={null} />
    )

    const button = component.getByText('view details')
    fireEvent.click(button)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(addLike.mock.calls).toHaveLength(2)


  })

  test('url and likes are shown after clicking view details', async () => {
    const blog = {
      title: 'Component testing',
      author: 'TTJ',
      url: 'logl',
      user: {
        username: 'lolo',
        name: 'koko',
      }
    }

    const component = render(
      <Blog blog={blog} user={null} />
    )

    const button = component.getByText('view details')
    fireEvent.click(button)

    const td_title = component.container.querySelector('.tdtitle')
    const td_author = component.container.querySelector('.tdauthor')
    const td_url = component.container.querySelector('.tdurl')
    expect(td_title).toHaveTextContent('Component testing')
    expect(td_author).toHaveTextContent('TTJ')
    expect(td_url).toHaveTextContent('logl')

  })

})