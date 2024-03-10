import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import TestFilter from './TextFilter'
import { expect } from "vitest"
describe('Component TextFilter', () => {
    it("renders the TextFilter Component", async () => {
        render(<TestFilter />)
    })

    it("has h1 with text content hello as default", async () => {
        // arrange
        render(<TestFilter />)

        // act
        const heading = screen.getByRole('heading', {
            level: 1
        })

        // assert
        expect(heading).toHaveTextContent('Hello')
    })

    it("has h1 which uses props title", async () => {
        // arrange
        const title = 'other text'
        render(<TestFilter title={title} />)

        // act
        const heading = screen.getByRole('heading', {
            level: 1
        })

        // assert
        expect(heading).toHaveTextContent(title)
        expect(heading).not.toHaveTextContent('Hello')
    })

    it("has an input field with type text", async () => {
        // arrange
        const user = userEvent.setup()
        const textToType = "typing some text..."
        render(<TestFilter />)
        const input = screen.getByTestId('txtInp')

        // act
        await user.type(input, textToType)

        // assert
        expect(input).toHaveValue(textToType)
        expect(input.getAttribute('type')).toBe('text')
    })

    it('has span with text from input', async () => {
        // arrange
        const user = userEvent.setup()
        const textToType1 = "typing some text..."
        const textToType2 = "typing some other text..."
        render(<TestFilter />)
        const input = screen.getByTestId('txtInp')
        const span = screen.getByTestId('txtSpn')

        // act and assert
        await user.type(input, textToType1)
        expect(span).toHaveTextContent(textToType1)

        await user.clear(input)

        await user.type(input, textToType2)
        expect(span).toHaveTextContent(textToType2)
    })

    it('shows default error in span if there is an invalid string in input', async () => {
        // arrange
        const user = userEvent.setup()
        const defaultError = 'Invalid Text'
        const invalidStartinCharacters = ['a', 'b', '1', '2']
        render(<TestFilter />)
        const input = screen.getByTestId('txtInp')
        const span = screen.getByTestId('txtSpn')

        // act and assert
        for (let char of invalidStartinCharacters) {
            await user.clear(input)
            await user.type(input, char)
            expect(span).toHaveTextContent(defaultError)
        }
    })

    it('shows custom error in span if there is an invalid string in input', async () => {
        // arrange
        const user = userEvent.setup()
        const customError = 'Invalid Custom Text'
        const invalidStartinCharacters = ['a', 'b', '1', '2']
        render(<TestFilter invalidMsg={customError} />)
        const input = screen.getByTestId('txtInp')
        const span = screen.getByTestId('txtSpn')

        // act and assert
        for (let char of invalidStartinCharacters) {
            await user.clear(input)
            await user.type(input, char)
            expect(span).toHaveTextContent(customError)
        }
    })
})