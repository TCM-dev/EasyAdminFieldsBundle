<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;

class PublishField
{
    public static function new(): array
    {
        return [
            MaskField::new('status')
                ->setChoices([
                    "Brouillon" => "DRAFT",
                    "Publié" => "PUBLISHED",
                    "Archivé" => "ARCHIVED",
                    "Programmé" => "PROGRAMMED"
                ])
                ->map([
                    "PROGRAMMED" => ['published_at', 'archived_at'],
                    "PUBLISHED" => ['archived_at'],
                ]),
            DateField::new('published_at'),
            DateField::new('archived_at'),
        ];
    }
}