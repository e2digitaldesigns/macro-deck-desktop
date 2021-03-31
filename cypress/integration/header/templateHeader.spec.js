context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9001/");
  });

  it("Full Screen Button should toggle", () => {
    cy.get("[data-testid=template-header-full-screen-button]").click();
    cy.get("[data-testid=template-header-full-screen-exit-button]").should(
      "be.visible"
    );
  });
});
