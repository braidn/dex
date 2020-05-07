# Bullseye's Sekret Identity

**A** collection of RPC like endpoints to ship shipments.

**Not** a rewrite

**An Experiment** that could aim at relieving a somewhat conveluted existing current application.

## Getting Started

The following small steps are required to get up and running.

1. Install a Node version > 12.16 (.nvmrc included)
1. Build and install [Rome][rome] to use the build chain
1. Run `npm i` to install dependencies
1. Run `npm t` to run tests (all should pass)

## Inspiration

The following talk about ['The Art of Destroying Software'][dvideo].

## Philosophy

A general ethos for the project.

### Technical

* _Ease of Deployment_: Getting this into staging or productions shouldn't be a bear.
    any programmer should be able to deploy their branch to a working staging site.
* _Minimal Tooling_: Let's not drown in the world of JS tooling.
    Find something that satisfies most of the linting/fixing needs and use a type system where appropriate.
* _Locality_: The application and all of it's parts must be runnable locally.
    This doesn't mean that everything should function while disconnected but, it should be close.


[dvideo]: https://vimeo.com/108441214
[rome]: https://romejs.dev/docs/introduction/installation
