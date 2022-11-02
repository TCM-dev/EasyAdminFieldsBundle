<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

use BackedEnum;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Contracts\Field\FieldInterface;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use Symfony\Component\Form\Extension\Core\Type\EnumType;

class EnumField
{
    public static function new(string $propertyName, string $enumFqn, string $pageName, $label = null): FieldInterface
    {
        $field = ChoiceField::new($propertyName, $label)
            ->setFormType(EnumType::class)
            ->setFormTypeOption('class', $enumFqn);

        if (!enum_exists($enumFqn)) {
            return $field;
        }

        /** @var BackedEnum $enumFqn */
        $field->setChoices($enumFqn::cases());

        if (in_array($pageName, [Crud::PAGE_INDEX, Crud::PAGE_DETAIL], true)) {
            $field->setChoices(array_reduce(
                $enumFqn::cases(),
                static fn(array $choices, $enum) => $choices + [$enum->name => $enum->value],
                [],
            ));
        }

        return $field;
    }
}