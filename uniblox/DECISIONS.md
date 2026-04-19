# DECISIONS.md

## Decision: Use In-Memory Store

**Context:** The assignment mentioned that using a database was optional.

**Options Considered:**
- Option A: Use a database like MongoDB
- Option B: Use an in-memory store

**Choice:** In-memory store

**Why:** It keeps the implementation simple and fast. Since persistence was not required, an in-memory store was enough to focus on business logic.


---

## Decision: Separate Services from Controllers

**Context:** Needed to structure the code in a clean way.

**Options Considered:**
- Option A: Write logic directly in controllers
- Option B: Create a service layer

**Choice:** Service layer

**Why:** It keeps controllers simple and moves all business logic into services. This also made it easier to write unit tests.


---

## Decision: Use JavaScript instead of TypeScript

**Context:** Choosing the language for implementation.

**Options Considered:**
- Option A: TypeScript
- Option B: JavaScript

**Choice:** JavaScript

**Why:** JavaScript allowed faster development for this assignment. Since the focus was on logic and APIs, avoiding extra setup helped me move quickly. TypeScript can be added later for better scalability.


---

## Decision: Discount Based on Nth Order

**Context:** The requirement was to generate a discount after every Nth order.

**Options Considered:**
- Option A: Random discount generation
- Option B: Based on order count

**Choice:** Based on order count

**Why:** It is predictable, easy to implement, and matches the requirement exactly.


---

## Decision: Validate Discount Before Applying

**Context:** Needed to handle discount codes safely.

**Options Considered:**
- Option A: Apply discount without checking
- Option B: Validate before applying

**Choice:** Validate before applying

**Why:** Prevents invalid or already-used codes from being applied and makes the system more reliable.


---

## Decision: Use Jest for Unit Testing

**Context:** Required to test core business logic.

**Options Considered:**
- Option A: No tests
- Option B: Use Jest

**Choice:** Jest

**Why:** It is simple to set up and works well for testing individual functions. It helped verify cart, checkout, and discount logic independently.