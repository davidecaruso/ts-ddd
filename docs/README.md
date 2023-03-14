![logo](assets/logo-256x256.png 'ts-ddd')

A TypeScript library to simplify the implementation of the building blocks that make up the tactical design of bounded contexts.

**Disclaimer**. Teaching Domain-driven design is out of scope of this project, so the documentation assumes you already know what DDD is.

## Components

### Domain

#### Entity

Definition of entity, with specific ID. It is extended by **Aggregate Root**, which implicitly is an aggregate with within a root entity.

#### Value Object

Definition of value object.

- **ID**: represents an identifier. It provides some extension-ready classes (integer, object, string and uuid).
- **Date Time**: represents a date value with time. It provides some specific classes (created at, updated at, deleted at and occurred at).
- **Number**: represents a number. It provides some specific classe (integer, decimal, positive integer, positive decimal).

#### Event

Definition of domain event.

#### Error

Definition of domain error.

### Application

#### DTO

An object which is responsible for carry data between processes.

- **Command**: to be used for creation, editing o deleting flows.
- **Query**: to be used for querying the data.

#### Handler

- **Command**: to be used for handling creation, editing o deleting flows.
- **Query**: to be used for handling querying the data.

#### Persistence

- **Repository**: a port for entity-based data layer.

#### Event

- **Listener**: a port for listening domain events.
- **Publisher**: a port for publishing domain events.

#### Logging

A port for logging interface.

### Presentation

#### Error

- **Http**: provides all client and server Http errors defined by the [RFC7231](https://www.rfc-editor.org/rfc/rfc7231#section-6).

### Infrastructure

TBD

## Examples

[Here](https://github.com/davidecaruso/ts-ddd/tree/main/examples) working examples.

## Resources

A useful list of resources which inspired this project:

- [DDD, Hexagonal, Onion, Clean, CQRS, … How I put it all together](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)
