------------------------- SELECT Queries --------------------------

--- Select all Units (in progress)
SELECT * FROM Units;

--- Select all Tenants (in progress)
SELECT * FROM Tenants;

--- Select all RentalAgreements
SELECT RentalAgreements.rental_ID, Tenants.first_name, Tenants.last_name, Units.unit_number, RentalAgreements.start_date, RentalAgreements.end_date, RentalAgreements.total_rent_balance, RentalAgreements.security_deposit
FROM RentalAgreements
JOIN Tenants ON RentalAgreements.tenant_ID = Tenants.tenant_ID
JOIN Units ON RentalAgreements.unit_ID = Units.unit_ID;

--- Select all UtilityProviders
SELECT * FROM UtilityProviders;

--- Select all MaintenanceRequests
SELECT MaintenanceRequests.maintenance_request_ID, Units.unit_number, Tenants.first_name, Tenants.last_name, MaintenanceRequests.description, MaintenanceRequests.date_submitted, MaintenanceRequests.time_to_complete, MaintenanceRequests.repair_cost, MaintenanceRequests.is_closed
FROM MaintenanceRequests
JOIN Units ON MaintenanceRequests.unit_ID = Units.unit_ID
JOIN Tenants ON MaintenanceRequests.tenant_ID = Tenants.tenant_ID;

--- Select all MaintenanceWorkers
SELECT * FROM MaintenanceWorkers;

--Select all ProvidedUtilities
SELECT * FROM ProvidedUtilities;

--Select all RequestAssignments
SELECT * FROM RequestAssignments;

-------------------------- INSERT Queries --------------------------

--- Insert into Units
-- Insert a new unit into the Units table
INSERT INTO Units (is_available, num_bedrooms, num_bathrooms, square_feet, unit_number, rent_price, previous_year_income, year)
VALUES (:isAvailableInput, :numBedroomsInput, :numBathroomsInput, :squareFeetInput, :unitNumberInput, :rentPriceInput, :previousYearIncomeInput, :yearInput);

--- Insert into Tenants
INSERT INTO Tenants (first_name, last_name, phone_number, email, rent_balance)
VALUES (:firstNameInput, :lastNameInput, :phoneNumberInput, :emailInput, :rentBalanceInput);

--- Insert into RentalAgreements

--- Insert into UtilityProviders
INSERT INTO UtilityProviders (name, service_type, utility_cost)
VALUES (:providerNameInput, :serviceTypeInput, :utilityCostInput);

--- Insert into MaintenanceRequests

--- Insert into MaintenanceWorkers

--- Insert into ProvidedUtilities

--- Insert into RequestAssignments


-------------------------- UPDATE Queries --------------------------
--- Update Unit
UPDATE Units
SET 
    is_available = :updatedIsAvailableInput,
    num_bedrooms = :updatedNumBedroomsInput,
    num_bathrooms = :updatedNumBathroomsInput,
    square_feet = :updatedSquareFeetInput,
    unit_number = :updatedUnitNumberInput,
    rent_price = :updatedRentPriceInput,
    previous_year_income = :updatedPreviousYearIncomeInput,
    year = :updatedYearInput
WHERE unit_ID = :unitIDInput;

--- Update Tenant
UPDATE Tenants
SET 
    first_name = :updatedFirstNameInput,
    last_name = :updatedLastNameInput,
    phone_number = :updatedPhoneNumberInput,
    email = :updatedEmailInput,
    rent_balance = :updatedRentBalanceInput
WHERE tenant_ID = :tenantIDInput;

--- Update UtilityProvider
UPDATE UtilityProviders
SET name = :updatedProviderNameInput, 
    service_type = :updatedServiceTypeInput,
    utility_cost = :updatedUtilityCostInput
WHERE provider_ID = :providerIDInput;


-------------------------- DELETE Queries --------------------------
--- Delete Tenant (in progress)
