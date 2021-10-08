<?php

namespace Insitaction\EasyAdminFieldsBundle\EventSubscriber;

use EasyCorp\Bundle\EasyAdminBundle\Event\BeforeEntityPersistedEvent;
use EasyCorp\Bundle\EasyAdminBundle\Event\BeforeEntityUpdatedEvent;
use Insitaction\EasyAdminFieldsBundle\Enum\EnumPublishable;
use Insitaction\EasyAdminFieldsBundle\Field\PublishableInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;

class PublishableSubscriber implements EventSubscriberInterface
{

    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents()
    {
        return [
            BeforeEntityPersistedEvent::class => ['onBeforeEntityPersisted'],
            BeforeEntityUpdatedEvent::class => ['onBeforeEntityUpdated'],
        ];
    }

    public function onBeforeEntityPersisted(BeforeEntityPersistedEvent $event)
    {
        $entity = $event->getEntityInstance();

        if ($entity instanceof PublishableInterface) {
            $this->setPublishableDates($entity);
        }
    }

    public function onBeforeEntityUpdated(BeforeEntityUpdatedEvent $event)
    {
        $entity = $event->getEntityInstance();

        if ($entity instanceof PublishableInterface) {
            $this->setPublishableDates($entity);
        }
    }

    public function setPublishableDates(PublishableInterface $entity)
    {
        if ($entity->getStatus() === EnumPublishable::PUBLISHED) {
            $entity->setPublishedAt(new \DateTimeImmutable());
        } else if ($entity->getStatus() === EnumPublishable::DRAFT) {
            $entity->setPublishedAt(null);
            $entity->setArchivedAt(null);
        } else if ($entity->getStatus() === EnumPublishable::ARCHIVED) {
            $entity->setArchivedAt(new \DateTimeImmutable());
        }
    }
}