# SkillfyBank: Containerized Microservices with High Availability and Smart Traffic Routing

**Name:** Kankera Josephine
**Programme:** Skillfyme DevOps
**Assignment:** Docker Production-Level Assignment #1
**GitHub:** kajose01 | **Docker Hub:** kaj1

## 1. Problem statement
SkillfyBank needs three banking microservices (Account, Transaction, Notification)
containerized, run with high availability on Docker Swarm, migrated to Kubernetes,
and secured with intelligent traffic routing using Istio.

## 2. Solution approach
| Part | What was built | Status |
|------|----------------|--------|
| 1 | Dockerfiles with multi-stage builds, .dockerignore, layer caching; Docker network; images on Docker Hub; broken-push troubleshooting | done |
| 2 | Docker Swarm (3 managers + 2 workers), stack deploy, overlay network, rolling update, auto-restart, node-failure test, healthchecks | in progress |
| 3 | Kubernetes (3-node cluster), Deployments, ConfigMaps, Secrets, HPA, PV/PVC, Services, rollback, taints/tolerations | pending |
| 4 | Istio: mTLS, 90/10 traffic split, canary, header-based A/B, Jaeger, circuit breaking | pending |

Services: Account (Node.js, port 3000), Transaction (Spring Boot, port 8080, internal only),
Notification (Python Flask, port 5000).

## 3. Dependencies and setup
- Ubuntu server (AWS EC2 t3.large, 8 GB RAM)
- Docker Engine 27+, Docker Compose plugin
- A Docker Hub account (images: kaj1/skillfy-account, kaj1/skillfy-transaction, kaj1/skillfy-notification)
- Part 2: Docker-in-Docker containers simulate the five Swarm nodes
- Part 3 and 4: k3d, kubectl, istioctl

## 4. Execution steps
### Part 1

    docker build -t kaj1/skillfy-account:1.0 account
    docker build -t kaj1/skillfy-transaction:1.0 transaction
    docker build -t kaj1/skillfy-notification:1.0 notification
    docker network create skillfy-net
    docker run -d --name transaction --network skillfy-net kaj1/skillfy-transaction:1.0
    docker run -d --name account --network skillfy-net -p 3000:3000 kaj1/skillfy-account:1.0
    docker run -d --name notification --network skillfy-net -p 5000:5000 kaj1/skillfy-notification:1.0
    curl localhost:3000/accounts/transactions

### Part 2
See swarm/stack.yml. Deploy on a manager node with:

    docker stack deploy -c stack.yml bank

(Parts 3 and 4 are added as they are completed.)

## 5. Evidence
Screenshots are in docs/screenshots/.
