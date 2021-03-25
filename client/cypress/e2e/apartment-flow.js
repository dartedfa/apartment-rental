import {buildApartment} from '../../src/test/generate'

// Before running this tests we want to be sure that user is created.
const user = {
  email: "test-apartment-rental@gmail.com",
  password: 'test-apartment-pass'
}

// This is important !
// We need to create another user with role of realtor before running test.
// email of john.doe@gmail.com
// firstname John, lastName: Doe.

const realtorId = '605bd17f1cf7911cbfb646ac'

describe('Apartment create/remove functionality', () => {
  it('should allow a typical realtor flow.', () => {
    cy.visit('/')
    const apartment = buildApartment()

    cy.findByRole('button', {name: /login/i}).click()

    cy.findByRole('dialog').within(() => {
      cy.findByRole('textbox', {name: /email/i}).type(user.email)
      cy.findByLabelText(/password/i).type(user.password)
      cy.findByRole('button', {name: /login/i}).click()
    })

    cy.findByRole('navigation').within(() => {
      cy.findByRole('link', {name: /apartments/i}).click()
    })

    cy.findByRole('main').within(() => {
      cy.findByRole('button', {name: /add new apartment/i}).click()

      cy.findByRole('textbox', {name: /name/i}).type(apartment.name)
      cy.findByRole('textbox', {name: /description/i}).type(apartment.desciption)
      cy.findByRole('spinbutton', {name: /price/i}).type(apartment.price)
      cy.findByRole('spinbutton', {name: /size/i}).type(apartment.size)
      cy.findByRole('spinbutton', {name: /rooms/i}).type(apartment.rooms)
      cy.findByRole('spinbutton', {name: /longitude/i}).type(apartment.longitude)
      cy.findByRole('spinbutton', {name: /latitude/i}).type(apartment.latitude)

      cy.findByRole('combobox').select(realtorId)

      cy.findByRole('button', {name: /add apartment/i}).click()
    })

    cy.findByRole('navigation').within(() => {
      cy.findByRole('link', {name: /apartments/i}).click()
    })

    cy.findByRole('main').within(() => {
      cy.findAllByRole('link', {name: apartment.name}).should('have.length', 1)
      cy.findByRole('link', {name: apartment.name}).click()
      cy.findByText(apartment.desciption).should('exist')
      cy.findByRole('heading', {name: apartment.name}).should('exist')
      cy.findByText(`Rooms: ${apartment.rooms}`).should('exist')
      cy.findByText(`Price: ${apartment.price} $`).should('exist')
      cy.findByText(`Status: Room is currently rented`).should('exist')
      cy.findByText(`John Doe`).should('exist')
      cy.findByText(`john.doe@gmail.com`).should('exist')
    })

    cy.findByRole('navigation').within(() => {
      cy.findByRole('link', {name: /apartments/i}).click()
    })

    cy.findByRole('main').within(() => {
      cy.get("[data-cy='remove-button']").click()
      cy.findByRole('button', {name: /yes/i}).click()

      cy.findAllByRole('link', {name: apartment.name}).should('not.exist')
      cy.findByText(
        'Hey there! Welcome to Apartment rental. as it seems we can\'t find any apartments for you :('
      ).should('exist')
    })

    cy.findByRole('button', {name: /log out/i}).click()

    cy.findByText(/apartment rental/i).should('exist')
  })
})
