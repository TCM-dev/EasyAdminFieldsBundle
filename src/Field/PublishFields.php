<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use Insitaction\EasyAdminFieldsBundle\Enum\EnumPublishable;

class PublishFields
{
    public static function new(): array
    {
        return [
            MaskField::new('status', 'label.status')
                ->setChoices(EnumPublishable::getChoices())
                ->map([
                    EnumPublishable::PROGRAMMED => ['published_at', 'archived_at'],
                    EnumPublishable::PUBLISHED => ['archived_at'],
                ]),
            DateField::new('published_at', 'label.published_at'),
            DateField::new('archived_at', 'label.archived_at')
        ];
    }
}