<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

use EasyCorp\Bundle\EasyAdminBundle\Contracts\Field\FieldInterface;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;

class EnumField
{
    public static function new(string $propertyName, $label = null): FieldInterface
    {
        return ChoiceField::new($propertyName, $label)
            ->setFieldFqcn(self::class);
    }
}