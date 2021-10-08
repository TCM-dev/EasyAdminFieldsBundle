<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use Insitaction\EasyAdminFieldsBundle\Enum\EnumPublishable;

class PublishFields
{
    public static function new(): array
    {
        return [
            MaskField::new('status')
                ->setChoices(EnumPublishable::getChoices())
                ->map([
                    EnumPublishable::PROGRAMMED => ['published_at', 'archived_at'],
                    EnumPublishable::PUBLISHED => ['archived_at'],
                ]),
            DateField::new('published_at'),
            DateField::new('archived_at'),
        ];
    }
}