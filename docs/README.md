![logo](assets/logo-256x256.png 'ts-ddd')

A TypeScript library to simplify the implementation of the building blocks that make up the tactical design of bounded
contexts.

**Disclaimer**. Teaching Domain-driven design is out of scope of this project, so the documentation assumes you already
know what DDD is.

## Components

### Domain

#### Entity

Definition of entity, with specific ID. It is extended by **Aggregate Root**, which implicitly is an aggregate with
within a root entity.

#### Value Object

Definition of value object.

- **Id**: represents an identifier. It provides some extension-ready classes (integer, object, string and uuid).
- **Date Time**: represents a date value with time. It provides some specific classes (created at, updated at, deleted
  at and occurred at).
- **Number**: represents a number. It provides some specific classe (integer, decimal, positive integer, positive
  decimal).

#### Event

Definition of domain event.

#### Error

Definition of domain error.

### Application

#### Dto

An object which is responsible for carry data between processes.

- **Dto**: generic data object.
- **Command**: data object to be used for creation, editing o deleting.
- **Query**: data object to be used for querying.

#### Service

Can be considered the use-case handlers of the application.
It may depend on _ports_, interfaces that will – maybe – be implemented with primary or secondary adapters.
It may receives _Dto_ (better if _Command_ or _Query_) to execute application flows.

#### Repository

A port for entity-based data layer. It is an interface that defines how to query and/or store data.

#### Event

- **Listener**: a port for listening domain events.
- **Publisher**: a port for publishing domain events.

#### Logging

A port for logging interface.

### Presentation

#### Http

- **Error**: provides all client and server Http errors defined by
  the [RFC7231](https://www.rfc-editor.org/rfc/rfc7231#section-6); moreover, provides a method (`toJson`) to display
  it in the [RFC7807](https://www.rfc-editor.org/rfc/rfc7807) format.

### Infrastructure

TBD

## Examples

[Here](https://github.com/davidecaruso/ts-ddd/tree/main/examples) working examples.

## Resources

A useful list of resources which inspired this project:

- [DDD, Hexagonal, Onion, Clean, CQRS, … How I put it all together](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)
- [Hexagonal Architecture: What You Get Out Of It](https://www.nirmitee.io/blogs/hexagonal-architecture-what-you-get-out-of-it)
