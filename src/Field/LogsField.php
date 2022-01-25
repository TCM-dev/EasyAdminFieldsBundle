<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

use EasyCorp\Bundle\EasyAdminBundle\Contracts\Field\FieldInterface;
use EasyCorp\Bundle\EasyAdminBundle\Field\FieldTrait;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

final class LogsField implements FieldInterface
{
    use FieldTrait;

    /**
     * @param string|false|null $label
     */
    public static function new(string $propertyName, $label = null): self
    {
        return (new self())
            ->setProperty($propertyName)
            ->setLabel($label)
            ->setTemplatePath('@EasyAdminFields/crud/field/logs.html.twig')
            ->setFormType(TextareaType::class)
            ->addCssClass('field-logs')
            ->setCustomOption('attr.data-eaf-upload-dir-path', "TEST")
            ->hideOnForm()
            ->hideOnIndex();
    }
}