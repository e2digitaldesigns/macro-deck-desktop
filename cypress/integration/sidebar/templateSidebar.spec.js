let newProfileName = "Cypress Profile";
const newProfileButtonPads = ["32", "24"];

context("Actions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  beforeEach(() => {
    cy.viewport(1280, 885);
    cy.get("[data-testid=template-sidebar-create-new-profile]").as(
      "newProfileButton"
    );
    // newProfileName = "Cypress Profile";
  });

  it("Should edit first profile", () => {
    cy.get(".menu-item")
      .eq(1)
      .click()
      .children(".menu-item-button")
      .children(".menu-item-button-edit")
      .click()
      .wait(2000);

    cy.get(".menu-item-information-active")
      .children(".menu-item-infomation-inner")
      .children("input")
      .focus()
      .type("{selectall}")
      .type(newProfileName, { delay: 100 })
      .should("have.value", newProfileName);
  });

  it("Should create new profile", () => {
    cy.get("@newProfileButton").click();

    const menuButtonItem = cy
      .get(".menu-item-button")
      .contains("New Profile")
      .parent(".menu-item-button");
    menuButtonItem.click();

    menuButtonItem.children(".menu-item-button-edit").click().wait(1000);

    cy.get(".menu-item-information-active")
      .children(".menu-item-infomation-inner")
      .children("input")
      .should("have.value", "New Profile")
      .focus()
      .type("{selectall}")
      .type(newProfileName, { delay: 100 })
      .should("have.value", newProfileName);

    cy.get(".menu-item-information-active")
      .children(".menu-item-infomation-inner")
      .children("select")
      .select(newProfileButtonPads[0])
      .should("have.value", newProfileButtonPads[0])
      .wait(1000)
      .select(newProfileButtonPads[1])
      .should("have.value", newProfileButtonPads[1])
      .wait(1000);

    cy.get(".menu-item-information-active")
      .children(".menu-item-infomation-inner")
      .children(".menu-item-information-submit")
      .click()
      .wait(5000);

    cy.get(".menu-item-button")
      .contains(newProfileName)
      .parent(".menu-item-button")
      .children(".menu-item-button-remove")
      .click();
  });
});
